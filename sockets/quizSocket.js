const WebSocket = require("ws");
const { generateUserId } = require("../utils/helpers");

const quizSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  const liveQuizes = {};
  const quizClients = {};

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws._userId = generateUserId();

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);

      let parsedMessage;
      try {
        parsedMessage = JSON.parse(message);
      } catch (error) {
        ws.send(JSON.stringify({ type: "ERROR", message: "Server error" }));
        console.error("Failed to parse message:", error);
        return;
      }

      if (parsedMessage.type === "JOIN_QUIZ" && parsedMessage.code) {
        const quizCode = parsedMessage.code;

        const quiz = Object.values(liveQuizes).find((quiz) => quiz.code === quizCode);

        if (!quiz) {
          console.log(`Quiz not found for code: ${quizCode}`);
          ws.send(JSON.stringify({ type: "ERROR", message: "Quiz not found" }));
          return;
        }

        const quizId = quiz._id;

        if (!quizClients[quizId]) {
          quizClients[quizId] = [];
        }

        quizClients[quizId].push({ ws, hasAnswered: false });
        console.log(`Client joined quiz: ${quizId}`);
        broadCastCurrentQuestion(quizId, liveQuizes[quizId].questions[0]);
      }

      if (parsedMessage.type === "ANSWER_QUESTION" && parsedMessage.code) {
        const { answer } = parsedMessage;
        const quizCode = parsedMessage.code;

        const quiz = Object.values(liveQuizes).find((quiz) => quiz.code === quizCode);

        if (!quiz) {
          console.log(`Quiz not found for code: ${quizCode}`);
          ws.send(JSON.stringify({ type: "ERROR", message: "Quiz not found" }));
          return;
        }

        const quizId = quiz._id;

        handleAnswer(ws, quizId, answer);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      for (const quizId in quizClients) {
        quizClients[quizId] = quizClients[quizId].filter((client) => client.ws !== ws);
      }
    });
  });

  console.log("WebSocket server is running");

  const broadCastCurrentQuestion = (quizId, currentQuestion) => {
    const message = JSON.stringify({
      type: "CURRENT_QUESTION",
      quizId,
      question: currentQuestion,
    });

    const clients = quizClients[quizId] || [];

    clients.forEach(({ ws }) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  };

  const addQuiz = (quizId, quizData) => {
    liveQuizes[quizId] = { ...quizData, currentQuizIndex: 0, scores: {} };

    const currentQuestion = liveQuizes[quizId].questions[liveQuizes[quizId].currentQuizIndex];

    broadCastCurrentQuestion(quizId, currentQuestion);
  };

  const deleteQuiz = (quizId) => {
    delete liveQuizes[quizId];
  };

  const getLiveQuizes = () => {
    return liveQuizes;
  };

  const handleAnswer = (ws, quizId, answer) => {
    const quiz = liveQuizes[quizId];
    if (!quiz) {
      console.log(`Quiz not found: ${quizId}`);
      return;
    }

    const currentQuestion = quiz.questions[quiz.currentQuizIndex];

    const isRightAnswer = currentQuestion.answers.some((ans) => ans === parseInt(answer));

    if (currentQuestion && isRightAnswer) {
      const userId = ws._userId;
      if (!quiz.scores[userId]) {
        quiz.scores[userId] = 0;
      }
      quiz.scores[userId] += 10;
      console.log(`User ${userId} answered correctly! Current score: ${quiz.scores[userId]}`);

      ws.send(JSON.stringify({ type: "SCORE_UPDATE", score: quiz.scores[userId] }));
    } else {
      console.log(`User answered incorrectly: ${answer}`);
    }

    const clientEntry = quizClients[quizId].find((client) => client.ws === ws);
    if (clientEntry) {
      clientEntry.hasAnswered = true;
    }

    const allAnswered = quizClients[quizId].every((client) => client.hasAnswered);
    if (allAnswered) {
      console.log(`All clients have answered for quiz: ${quizId}`);
      updateCurrentQuestion(quizId);
    }
  };

  const updateCurrentQuestion = (quizId) => {
    const quiz = liveQuizes[quizId];
    if (quiz) {
      quiz.currentQuizIndex++;
      quizClients[quizId].forEach((client) => {
        client.hasAnswered = false;
      });

      if (quiz.currentQuizIndex < quiz.questions.length) {
        const currentQuestion = quiz.questions[quiz.currentQuizIndex];
        broadCastCurrentQuestion(quizId, currentQuestion);
      } else {
        console.log(`Quiz ${quizId} has ended.`);
        deleteQuiz(quizId);
        // Handle end of quiz logic (e.g., broadcasting results)
      }
    }
  };

  return {
    addQuiz,
    deleteQuiz,
    getLiveQuizes,
    wss,
  };
};

module.exports = quizSocket;
