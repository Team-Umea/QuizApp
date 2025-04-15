const { shuffleArray } = require("../../utils/helpers");

const parseMessage = (ws, message) => {
  try {
    return JSON.parse(message);
  } catch (error) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Server error" }));
    console.error("Failed to parse message:", error);
    return null;
  }
};

const broadCastCurrentQuestion = (quiz, currentQuestion, quizClients) => {
  const quizId = quiz._id;

  const message = JSON.stringify({
    type: "CURRENT_QUESTION",
    question: {
      question: currentQuestion.question,
      options: shuffleArray(currentQuestion.options.filter((opt) => opt)),
    },
    quizState: {
      questionIndex: quiz.questionIndex,
      numQuestions: quiz.questions.length,
    },
  });

  const clients = quizClients[quizId] || [];

  clients.forEach(({ ws }) => {
    ws.send(message);
  });
};

module.exports = {
  parseMessage,
  broadCastCurrentQuestion,
};
