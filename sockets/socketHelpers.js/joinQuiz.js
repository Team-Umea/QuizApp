const { playerJoined } = require("./admin");
const { updateCurrentQuestion } = require("./answerQuestion");

const handleJoinQuiz = (ws, clients, message, quizClients, liveQuizes) => {
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

  clients[ws._userId].id = quizId;

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

  playerJoined(quizId, quizClients, clients);

  const isPublicQuiz = quiz.isPublic;

  if (isPublicQuiz) {
    startQuiz(quiz, liveQuizes, quizClients);
  }
};

const startQuiz = (quiz, liveQuizes, quizClients) => {
  const quizId = quiz._id;
  const isPublicQuiz = quiz.isPublic;

  if (!quizClients[quizId]) {
    quizClients[quizId] = [];
  }

  if (isPublicQuiz) {
    const firstQuestion = liveQuizes[quizId].questions[0];

    quizClients[quizId].forEach((client) => {
      client.ws.send(
        JSON.stringify({ type: "PENDING", message: "Quiz is getting ready", delay: 30 })
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
    }, 30000);
  } else {
    quizClients[quizId].forEach((client) => {
      client.ws.send(
        JSON.stringify({
          type: "START",
          question: { question: firstQuestion.question, options: firstQuestion.options },
          quizState: { questionIndex: 0, numQuestions: quiz.questions.length },
        })
      );
    });
  }

  quiz.isStarted = true;

  let questionIndex = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      if (quiz.questionIndex === questionIndex) {
        updateCurrentQuestion(quizId, liveQuizes, quizClients);
      }

      questionIndex = quiz.questionIndex;

      const isEndOfQuiz = questionIndex >= quiz.questions ? quiz.questions.length - 1 : true;

      if (isEndOfQuiz) {
        clearInterval(interval);
        updateCurrentQuestion(quizId, liveQuizes, quizClients);
      }
    }, 10000);
  }, 10000);
};

const ensureUniqueUsername = (users, username) => {
  return !users.some((name) => name.trim().toLowerCase() === username.trim().toLowerCase());
};

module.exports = { handleJoinQuiz, startQuiz };
