const requestPlayers = (ws, message, quizClients) => {
  const quizId = message.quizId;

  const clients = (quizClients[quizId] || []).map((client) => client.username);

  ws.send(JSON.stringify({ type: "PLAYERS", players: clients, quizId }));
};

const playerJoined = (quizId, quizClients, clients) => {
  const nonQuizClients = Object.entries(clients).filter(([key, value]) => key === value.id);

  console.log("Client: ", nonQuizClients);

  const players = (quizClients[quizId] || []).map((client) => client.username);

  nonQuizClients.forEach((client) => {
    client[1].ws.send(JSON.stringify({ type: "PLAYERS", players, quizId }));
  });
};

module.exports = { requestPlayers, playerJoined };
