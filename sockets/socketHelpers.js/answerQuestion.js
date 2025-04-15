const { broadCastCurrentQuestion } = require("./message");
const QuizModel = require("../../models/QuizModel");
const { handleQuizEnd } = require("./admin");
const { shuffleArray } = require("../../utils/helpers");

const handleAnswer = (ws, message, liveQuizes, quizClients, clients) => {
  const { answer, code: quizCode } = message;

  const quiz =
    Object.values(liveQuizes).find((quiz) => quiz.code === quizCode) ||
    liveQuizes[Object.keys(liveQuizes).find((key) => key === quizCode)];

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
    updateCurrentQuestion(quizId, liveQuizes, quizClients, clients);
    if (quiz.resetInterval) {
      quiz.resetInterval();
    }
  }
};

const updateCurrentQuestion = (quizId, liveQuizes, quizClients, clients) => {
  const quiz = liveQuizes[quizId];

  liveQuizes[quizId].remainingTime = 20;

  if (quiz) {
    quiz.questionIndex++;
    quizClients[quizId].forEach((client) => {
      client.hasAnswered = false;
    });

    if (quiz.questionIndex < quiz.questions.length) {
      const currentQuestion = quiz.questions[quiz.questionIndex];
      broadCastCurrentQuestion(quiz, currentQuestion, quizClients);

      quizClients[quizId].forEach((client) => {
        client.ws.send(
          JSON.stringify({
            type: "REMAINING_TIME",
            time: { remainingTime: liveQuizes[quizId].remainingTime, initialTime: 20 },
          })
        );
      });
    } else {
      if (quiz.cancelInterval) {
        quiz.cancelInterval();
      }

      if (quiz.stopCountDown) {
        quiz.stopCountDown();
      }

      const scores = quiz.scores;

      const result = quizClients[quizId]
        .map((client) => {
          const username = client.username;
          const score = !scores[client.ws._userId] ? 0 : scores[client.ws._userId].score;

          return {
            username,
            score,
            id: client.ws._userId,
          };
        })
        .sort((a, b) => b.score - a.score);

      storeResult(quizId, result, quizClients, clients).then(() => {
        quizClients[quizId].forEach((client) => {
          client.ws.send(
            JSON.stringify({
              type: "RESULT",
              result,
            })
          );
        });

        delete liveQuizes[quizId];

        QuizModel.findByIdAndUpdate(quizId, { isLaunched: false, isRunning: false }).then(
          (quizData) => {
            const isPublicQuiz = quizData.isPublic;

            if (isPublicQuiz) {
              liveQuizes[quizId] = {
                ...quizData._doc,
                _id: String(quizData._doc._id),
                questions: shuffleArray(quizData._doc.questions),
                questionIndex: 0,
                scores: {},
                isStarted: false,
              };

              const publicQuizes = Object.values(liveQuizes)
                .filter((quiz) => quiz.isPublic)
                .map((quiz) => ({
                  _id: quiz._id,
                  quizName: quiz.quizName,
                }));

              quizClients[quizId].forEach((client) => {
                client.ws.send(JSON.stringify({ type: "PUBLIC_QUIZ_UPDATE", publicQuizes }));
              });
            }

            handleQuizEnd(quiz, quizClients, clients);
          }
        );
      });
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
      quiz.bonusPoints -= 40;
    }

    ws.send(JSON.stringify({ type: "SCORE_UPDATE", score: quiz.scores[userId].score }));
  } else {
    quiz.scores[userId].streak = 0;
  }

  const clientEntry = quizClients[quizId].find((client) => client.ws._userId === ws._userId);

  if (clientEntry) {
    clientEntry.hasAnswered = true;
  }
};

const storeResult = async (quizId, result, quizClients, clients) => {
  const quiz = await QuizModel.findById(quizId);
  const initialQuizResult = quiz.result;
  let quizResult = quiz.result;

  quizClients[quizId].forEach((client) => {
    const origin = Object.values(clients || {}).find((c) => c.id === client.ws._userId)?.origin;
    const score = result.find((res) => res.id === client.ws._userId).score;
    const username = client.username;

    const existingOrigin = initialQuizResult.find((res) => res.origin === origin);

    if (existingOrigin) {
      quizResult = quizResult.map((res) => {
        const count = (existingOrigin.count || 0) + 1;
        const averageScore = Math.round((existingOrigin.score + score) / count);

        return res.origin === origin
          ? { origin, username: username, score: averageScore, count }
          : res;
      });
    } else {
      quizResult.push({ origin, username, score, count: 1 });
    }
  });

  const sortedResult = quizResult.sort((a, b) => b.score - a.score);
  quiz.result = sortedResult;
  await quiz.save();
};

module.exports = {
  handleAnswer,
  updateCurrentQuestion,
  storeResult,
};
