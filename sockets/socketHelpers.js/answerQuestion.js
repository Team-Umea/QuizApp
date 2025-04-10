const { broadCastCurrentQuestion } = require("./message");

const handleAnswer = (ws, message, liveQuizes, quizClients) => {
  const { answer, code: quizCode } = message;

  const quiz = Object.values(liveQuizes).find((quiz) => quiz.code === quizCode);

  if (!quiz) {
    console.log(`Quiz not found for code: ${quizCode}`);
    ws.send(JSON.stringify({ type: "ERROR", message: "Quiz not found" }));
    return;
  }

  const quizId = quiz._id;

  const currentQuestion = quiz.questions[quiz.questionIndex];

  correctAnswer(ws, quiz, quizClients, currentQuestion, answer);

  const allAnswered = quizClients[quizId].every((client) => client.hasAnswered);

  if (allAnswered) {
    quiz.bonusPoints = null;
    updateCurrentQuestion(quizId, liveQuizes, quizClients);
  }
};

const updateCurrentQuestion = (quizId, liveQuizes, quizClients) => {
  const quiz = liveQuizes[quizId];

  if (quiz) {
    quiz.questionIndex++;
    quizClients[quizId].forEach((client) => {
      client.hasAnswered = false;
    });

    if (quiz.questionIndex < quiz.questions.length) {
      const currentQuestion = quiz.questions[quiz.questionIndex];
      broadCastCurrentQuestion(quiz, currentQuestion, quizClients);
    } else {
      const scores = quiz.scores;

      const result = quizClients[quizId]
        .map((client) => {
          const username = client.username;
          const score = !scores[client.ws._userId] ? 0 : scores[client.ws._userId].score;

          return {
            username,
            score,
          };
        })
        .sort((a, b) => b.score - a.score);

      quizClients[quizId].forEach((client) => {
        client.ws.send(
          JSON.stringify({
            type: "RESULT",
            result,
          })
        );
      });

      delete liveQuizes[quizId];

      return {
        hasEnded: true,
      };
    }
  }
};

const correctAnswer = (ws, quiz, quizClients, currentQuestion, answer) => {
  if (!currentQuestion) {
    return;
  }

  const quizId = quiz._id;

  const isRightAnswer = currentQuestion.answers.some((ans) => parseInt(ans) === parseInt(answer));

  const userId = ws._userId;

  if (!quiz.scores[userId]) {
    quiz.scores[userId] = { score: 0, streak: 0 };
  }

  if (isRightAnswer) {
    if (quiz.bonusPoints == null) {
      quiz.bonusPoints = 200;
    }

    const bonus = quiz.bonusPoints > 0 ? quiz.bonusPoints : 0;
    const points = 1000 + 50 * quiz.scores[userId].streak + bonus;

    quiz.scores[userId].score += points;
    quiz.scores[userId].streak++;

    if (quiz.bonusPoints) {
      quiz.bonusPoints--;
    }

    ws.send(JSON.stringify({ type: "SCORE_UPDATE", score: quiz.scores[userId].score }));
  } else {
    quiz.scores[userId].streak = 0;
  }

  const clientEntry = quizClients[quizId].find((client) => client.ws === ws);

  if (clientEntry) {
    clientEntry.hasAnswered = true;
  }
};

module.exports = {
  handleAnswer,
  updateCurrentQuestion,
};
