const parseMessage = (ws, message) => {
  console.log(`Received message: ${message}`);

  try {
    return JSON.parse(message);
  } catch (error) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Server error" }));
    console.error("Failed to parse message:", error);
    return null;
  }
};

const broadCastCurrentQuestion = (quizId, currentQuestion, quizClients) => {
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

module.exports = {
  parseMessage,
  broadCastCurrentQuestion,
};
