const WebSocket = require("ws");
const { generateUserId } = require("../utils/helpers");
const { handleJoinQuiz, startQuiz } = require("./socketHelpers.js/joinQuiz");
const { parseMessage } = require("./socketHelpers.js/message");
const { handleAnswer } = require("./socketHelpers.js/answerQuestion");
const { requestPlayers, decodedUserId } = require("./socketHelpers.js/admin");

const quizSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  const clients = {};
  const liveQuizes = {};
  const quizClients = {};

  wss.on("connection", (ws, req) => {
    const userId = decodedUserId(req) || `user_${generateUserId()}`;
    const origin = req.headers.origin;

    const isNewClient = !Object.values(clients).some((client) => client.origin === origin);

    if (isNewClient) {
      clients[userId] = { ws, id: userId, origin };
    }

    ws._userId = userId;

    const publicQuizes = Object.values(liveQuizes)
      .filter((quiz) => quiz.isPublic)
      .map((quiz) => ({
        _id: quiz._id,
        quizName: quiz.quizName,
      }));

    ws.send(JSON.stringify({ type: "CONNECTED", publicQuizes }));

    ws.on("message", (message) => {
      const parsedMessage = parseMessage(ws, message);
      const quizCode = parsedMessage.code;
      const type = parsedMessage.type;

      if (quizCode) {
        switch (type) {
          case "JOIN_QUIZ":
            handleJoinQuiz(ws, clients, parsedMessage, quizClients, liveQuizes);
            break;
          case "ANSWER_QUESTION":
            handleAnswer(ws, parsedMessage, liveQuizes, quizClients, clients);
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case "GET_PLAYERS":
            requestPlayers(ws, parsedMessage, quizClients);
            break;
          default:
            break;
        }
      }
    });

    ws.on("close", () => {
      for (const quizId in quizClients) {
        quizClients[quizId] = quizClients[quizId].filter((client) => client.ws !== ws);
      }

      delete clients[ws._userId];
    });
  });

  const addQuiz = (quizId, quizData) => {
    liveQuizes[quizId] = { ...quizData, questionIndex: 0, scores: {}, isStarted: false };

    const publicQuizes = Object.values(liveQuizes)
      .filter((quiz) => quiz.isPublic)
      .map((quiz) => ({
        _id: quiz._id,
        quizName: quiz.quizName,
      }));

    Object.values(quizClients[quizId] || {}).forEach((client) => {
      client.ws.send(JSON.stringify({ type: "PUBLIC_QUIZ_UPDATE", publicQuizes }));
    });
  };

  const deleteQuiz = (quizId) => {
    delete liveQuizes[quizId];

    const publicQuizes = Object.values(liveQuizes)
      .filter((quiz) => quiz.isPublic)
      .map((quiz) => ({
        _id: quiz._id,
        quizName: quiz.quizName,
      }));

    Object.values(quizClients[quizId] || {}).forEach((client) => {
      client.ws.send(JSON.stringify({ type: "PUBLIC_QUIZ_UPDATE", publicQuizes, cancelled: true }));
    });

    quizClients[quizId] = [];
  };

  const launchQuiz = (quizId) => {
    const quiz = liveQuizes[quizId];
    startQuiz(quiz, liveQuizes, quizClients, clients);
  };

  return {
    addQuiz,
    deleteQuiz,
    launchQuiz,
    wss,
  };
};

module.exports = quizSocket;
