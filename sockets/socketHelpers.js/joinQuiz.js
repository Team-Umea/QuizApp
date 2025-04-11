const { updateCurrentQuestion } = require("./answerQuestion");

const handleJoinQuiz = (ws, message, quizClients, liveQuizes) => {
  const username = message.username;
  const quizCode = message.code;

  const quiz =
    Object.values(liveQuizes).find((quiz) => quiz.code === quizCode) ||
    liveQuizes[Object.keys(liveQuizes).find((key) => key === quizCode)];

  if (!quiz) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Quiz not found" }));
    return;
  }

  if (quiz.isStarted) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Cannot join an ongoing quiz" }));
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

  const players = quizClients[quizId].map((client) => client.username);

  ws.send(JSON.stringify({ type: "JOINED", players, quizName: quiz.quizName }));

  const startQuiz = players.length >= 2;

  if (startQuiz) {
    quiz.isStarted = true;

    const firstQuestion = liveQuizes[quizId].questions[0];

    quizClients[quizId].forEach((client) => {
      client.ws.send(
        JSON.stringify({ type: "PENDING", message: "Quiz is getting ready", delay: 3 })
      );
    });

    setTimeout(() => {
      quizClients[quizId].forEach((client) => {
        client.ws.send(
          JSON.stringify({
            type: "START",
            question: { question: firstQuestion.question, options: firstQuestion.options },
            quizState: { questionIndex: 0, numQuestions: quiz.questions.length },
          })
        );
      });
    }, 3000);

    let questionIndex = 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (quiz.questionIndex === questionIndex) {
          updateCurrentQuestion(quizId, liveQuizes, quizClients);
        }

        questionIndex = quiz.questionIndex;

        const isEndOfQuiz = questionIndex >= quiz.questions.length - 1;

        if (isEndOfQuiz) {
          clearInterval(interval);
          updateCurrentQuestion(quizId, liveQuizes, quizClients);
        }
      }, 8000);
    }, 8000);
  }
};

const ensureUniqueUsername = (users, username) => {
  return !users.some((name) => name.trim().toLowerCase() === username.trim().toLowerCase());
};

module.exports = { handleJoinQuiz };
