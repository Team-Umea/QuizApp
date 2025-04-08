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
    updateCurrentQuestion(quizId, liveQuizes, quizClients, onQuizEnd);
  }
};

const updateCurrentQuestion = (quizId, liveQuizes, quizClients) => {
  const quiz = liveQuizes[quizId];
  if (quiz) {
    quiz.currentQuizIndex++;
    quizClients[quizId].forEach((client) => {
      client.hasAnswered = false;
    });

    if (quiz.currentQuizIndex < quiz.questions.length) {
      const currentQuestion = quiz.questions[quiz.currentQuizIndex];
      broadCastCurrentQuestion(quizId, currentQuestion.quizClients);
    } else {
      console.log(`Quiz ${quizId} has ended.`);
      delete liveQuizes[quizId];
      // Handle end of quiz logic (e.g., broadcasting results)
    }
  }
};

module.exports = {
  handleAnswer,
  updateCurrentQuestion,
};
