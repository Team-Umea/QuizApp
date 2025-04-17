const QuizModel = require("../../models/QuizModel");
const { playerJoined } = require("./admin");
const { updateCurrentQuestion } = require("./answerQuestion");
const { Timer } = require("../../helpers/timer");
const { generateRandomColor, shuffleArray } = require("../../helpers/helpers");

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

  if (!quizClients[quizId]) {
    quizClients[quizId] = [];
  }

  ensureUniqueUsername(
    ws,
    quizId,
    quizClients[quizId].map((client) => client.username),
    username
  ).then((isUniqueUsername) => {
    if (!isUniqueUsername) {
      ws.send(JSON.stringify({ type: "ERROR", message: "Username is already taken" }));
      return;
    }

    const color = generateRandomColor(quizClients[quizId].map((client) => client.color));

    quizClients[quizId].push({ ws, hasAnswered: false, username, color });

    const players = quizClients[quizId].map((client) => client.username);
    const playersColorMap = quizClients[quizId].map((client) => ({
      username: client.username,
      color: client.color,
    }));

    quizClients[quizId].forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: "JOINED",
          players,
          quizName: quiz.quizName,
          quizId: quiz._id,
          playersColorMap,
        })
      );
    });

    playerJoined(quiz, quizClients, clients);

    const isPublicQuiz = quiz.isPublic;

    const isFirstPlayer = quizClients[quizId].length === 1;

    if (isPublicQuiz) {
      startQuiz(quiz, liveQuizes, quizClients, clients, isFirstPlayer);
    }
  });
};

const startQuiz = (quiz, liveQuizes, quizClients, clients, isFirstPlayer) => {
  const quizId = quiz._id;
  const isPublicQuiz = quiz.isPublic;

  if (!quizClients[quizId]) {
    quizClients[quizId] = [];
  }

  const firstQuestion = liveQuizes[quizId].questions[0];
  let questionIndex = 0;

  const timer = new Timer(30000, () => {
    if (quiz.questionIndex === questionIndex) {
      updateCurrentQuestion(quizId, liveQuizes, quizClients, clients);
    }

    questionIndex = quiz.questionIndex;

    const isEndOfQuiz = questionIndex >= quiz.questions.length - 1;

    if (isEndOfQuiz) {
      timer.stop();
      setTimeout(() => {
        updateCurrentQuestion(quizId, liveQuizes, quizClients, clients);
      }, 30000);
    }
  });

  const startCountDown = () => {
    const countDownTimer = new Timer(1000, () => {
      liveQuizes[quizId].remainingTime--;

      if (liveQuizes[quizId].remainingTime < 0) {
        liveQuizes[quizId].remainingTime = 30;
      }

      quizClients[quizId].forEach((client) => {
        client.ws.send(
          JSON.stringify({
            type: "REMAINING_TIME",
            time: { remainingTime: liveQuizes[quizId].remainingTime, initialTime: 30 },
          })
        );
      });
    });

    countDownTimer.start();
    quiz.stopCountDown = () => countDownTimer.stop();
  };

  const sendQuizStart = () => {
    liveQuizes[quizId].remainingTime = 30;

    quizClients[quizId].forEach((client) => {
      client.ws.send(
        JSON.stringify({
          type: "START",
          question: {
            question: firstQuestion.question,
            options: shuffleArray(firstQuestion.options.filter((opt) => opt)),
          },
          quizState: { questionIndex: 0, numQuestions: quiz.questions.length },
          time: { remainingTime: liveQuizes[quizId].remainingTime, initialTime: 30 },
        })
      );
    });

    startCountDown();
  };

  if (isPublicQuiz) {
    let delay = 30;
    let delayTimer;

    const sendQuizDelay = (delay) => {
      quizClients[quizId].forEach((client) => {
        client.ws.send(
          JSON.stringify({ type: "PENDING", message: "Quiz is getting ready", delay })
        );
      });
    };

    if (isFirstPlayer) {
      sendQuizDelay();

      delayTimer = new Timer(1000, () => {
        delay--;
        sendQuizDelay(delay);
      });

      delayTimer.start();
    }

    setTimeout(() => {
      if (isFirstPlayer) {
        sendQuizStart();
        quiz.isStarted = true;
        timer.start();
        delayTimer.stop();
      }
    }, 30000);
  } else {
    sendQuizStart();
    timer.start();
  }

  const reset = () => {
    questionIndex = quiz.questionIndex;
    timer.reset();
  };

  quiz.resetInterval = reset;
  quiz.cancelInterval = () => timer.stop();
};

const ensureUniqueUsername = async (ws, quizId, users, username) => {
  const quiz = await QuizModel.findById(quizId);
  const occupiedUsernames = quiz.result
    .filter((res) => ws.originUrl !== res.origin)
    .map((res) => res.username);

  return ![...users, ...occupiedUsernames].some(
    (name) => name.trim().toLowerCase() === username.trim().toLowerCase()
  );
};

module.exports = { handleJoinQuiz, startQuiz };
