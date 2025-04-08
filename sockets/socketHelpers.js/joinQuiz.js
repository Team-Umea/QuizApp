const { broadCastCurrentQuestion } = require("./message");

const handleJoinQuiz = (ws, message, quizClients, liveQuizes) => {
  const username = message.username;
  const quizCode = message.code;

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

  const isUniqueUsername = ensureUniqueUsername(
    quizClients[quizId].map((client) => client.username),
    username
  );

  if (!isUniqueUsername) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Username is already taken" }));
    return;
  }

  quizClients[quizId].push({ ws, hasAnswered: false, username });

  broadCastCurrentQuestion(quiz, liveQuizes[quizId].questions[0], quizClients, true);
};

const ensureUniqueUsername = (users, username) => {
  return !users.some((name) => name.trim().toLowerCase() === username.trim().toLowerCase());
};

module.exports = { handleJoinQuiz };
