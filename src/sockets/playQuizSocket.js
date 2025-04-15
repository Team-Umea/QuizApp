let socket = null;

export const getPlayQuizSocket = () => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("wss://quizio-61qh.onrender.com");
  }
  return socket;
};
