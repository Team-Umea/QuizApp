const jwt = require("jsonwebtoken");
const { parseCookies } = require("../../utils/helpers");
const QuizModel = require("../../models/QuizModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_APP_SECRET;
const JWT_KEY = process.env.JWT_APP_TOKEN_KEY;

const requestPlayers = (ws, message, quizClients) => {
  const quizId = message.quizId;

  const clients = (quizClients[quizId] || []).map((client) => client.username);

  ws.send(JSON.stringify({ type: "PLAYERS", players: clients, quizId }));
};

const playerJoined = (quiz, quizClients, clients) => {
  const quizId = quiz._id;

  const players = (quizClients[quizId] || []).map((client) => client.username);

  const quizAdmin = Object.values(clients).find((client) => client.id === quiz.user);

  if (quizAdmin) {
    quizAdmin.ws.send(JSON.stringify({ type: "PLAYERS", players, quizId }));
  }
};

const handleQuizEnd = (quiz, quizClients, clients) => {
  QuizModel.findByIdAndUpdate(quiz._id, { isLaunched: false, isRunning: false }).then(() => {
    const quizAdmin = Object.values(clients || {}).find((client) => client.id === quiz.user);

    if (quizAdmin) {
      quizAdmin.ws.send(JSON.stringify({ type: "QUIZ_END" }));
    }

    quizClients[quiz._id] = [];
  });
};

const decodedUserId = (req) => {
  const cookies = parseCookies(req.headers.cookie);

  if (!cookies) return null;

  const JWT_TOKEN = cookies[JWT_KEY];

  try {
    const decoded = jwt.verify(JWT_TOKEN, JWT_SECRET);

    return decoded._id;
  } catch (error) {
    return null;
  }
};

module.exports = { requestPlayers, playerJoined, decodedUserId, handleQuizEnd };
