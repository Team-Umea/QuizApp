const WebSocket = require("ws");

const quizSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  const liveQuizes = {};
  const quizClients = {};

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === "JOIN_QUIZ" && parsedMessage.quizId) {
        const quizId = parsedMessage.quizId;
        if (!quizClients[quizId]) {
          quizClients[quizId] = [];
        }
        quizClients[quizId].push(ws);
        console.log(`Client joined quiz: ${quizId}`);
      }
    });

    ws.on("cliose", () => {
      console.log("Client disconnected");
      for (const quizId in quizClients) {
        quizClients[quizId] = quizClients[quizId].filter((client) => client !== ws);
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

    console.log("Clients: ", clients);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  const addQuiz = (quizId, quizData) => {
    liveQuizes[quizId] = { ...quizData, currentQuizIndex: 0 };

    const currentQuestion = liveQuizes[quizId].questions[liveQuizes[quizId].currentQuizIndex];

    broadCastCurrentQuestion(quizId, currentQuestion);
  };

  const deleteQuiz = (quizId) => {
    delete liveQuizes[quizId];
    console.log(`Quiz deleted: ${quizId}`);
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
