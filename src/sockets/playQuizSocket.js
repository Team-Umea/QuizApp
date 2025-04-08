let socket = null;

export const getPlayQuizSocket = () => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("ws://localhost:3009");
  }
  return socket;
};
