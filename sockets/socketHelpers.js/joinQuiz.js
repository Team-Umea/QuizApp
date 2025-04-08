const { broadCastCurrentQuestion } = require("./message");

const handleJoinQuiz = (ws, message, quizClients, liveQuizes, callback) => {
  const username = message.username;
  const quizCode = parsedMessage.code;

  const quiz = Object.values(liveQuizes).find((quiz) => quiz.code === quizCode);

  if (!quiz) {
    console.log(`Quiz not found for code: ${quizCode}`);
    ws.send(JSON.stringify({ type: "ERROR", message: "Quiz not found" }));
    return;
  }

  const isUniqueUsername = ensureUniqueUsername(
    quizClients.map((client) => client.username),
    username
  );

  if (!isUniqueUsername) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Username is already taken" }));
    return;
  }

  const quizId = quiz._id;

  if (!quizClients[quizId]) {
    quizClients[quizId] = [];
  }

  quizClients[quizId].push({ ws, hasAnswered: false, username });
  console.log(`Client joined quiz: ${quizId}`);

  broadCastCurrentQuestion(quizId, liveQuizes[quizId].questions[0], quizClients);
};

const ensureUniqueUsername = (users, username) => {
  return !users.some((name) => name.trim().toLowerCase() === username.trim().toLowerCase());
};

module.exports = { handleJoinQuiz };
