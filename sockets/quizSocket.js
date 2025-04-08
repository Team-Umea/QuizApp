const WebSocket = require("ws");
const { generateUserId } = require("../utils/helpers");
const { handleJoinQuiz } = require("./socketHelpers.js/joinQuiz");
const { parseMessage } = require("./socketHelpers.js/message");
const { handleAnswer } = require("./socketHelpers.js/answerQuestion");

const quizSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  const liveQuizes = {};
  const quizClients = {};

  wss.on("connection", (ws) => {
    const userId = generateUserId();

    ws._userId = userId;

    ws.send(JSON.stringify({ type: "WELCOME", message: `Your id is ${userId}` }));

    ws.on("message", (message) => {
      const parsedMessage = parseMessage(ws, message);
      const quizCode = parsedMessage.code;
      const type = parsedMessage.type;

      console.log("Message: ", parsedMessage);

      if (quizCode) {
        switch (type) {
          case "JOIN_QUIZ":
            handleJoinQuiz(ws, parsedMessage, quizClients, liveQuizes);
            break;
          case "ANSWER_QUESTION":
            handleAnswer(ws, parsedMessage, liveQuizes, quizClients, deleteQuiz);

          default:
            break;
        }
      }
    });

    ws.on("close", () => {
      for (const quizId in quizClients) {
        quizClients[quizId] = quizClients[quizId].filter((client) => client.ws !== ws);
      }
    });
  });

  const addQuiz = (quizId, quizData) => {
    liveQuizes[quizId] = { ...quizData, currentQuizIndex: 0, scores: {} };
  };

  const deleteQuiz = (quizId) => {
    delete liveQuizes[quizId];
  };

  const getLiveQuizes = () => {
    return liveQuizes;
  };

  return {
    addQuiz,
    deleteQuiz,
    getLiveQuizes,
    wss,
  };
};

module.exports = quizSocket;
