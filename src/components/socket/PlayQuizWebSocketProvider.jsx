import { useEffect } from "react";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import { getPlayQuizSocket } from "../../sockets/playQuizSocket";
import { safeParseJSON } from "../../utils/helpers";
import { useNavigate } from "react-router";

export default function PlayQuizWebSocketProvider({ children }) {
  const navigate = useNavigate();
  const {
    updateConnected,
    updateError,
    updateCurrentQuestion,
    updateScore,
    updateQuizName,
    updateQuizState,
    updateQuizResult,
    updatePlayers,
    updateQuizStartDelay,
    updatePublicQuizes,
    resetQuiz,
  } = usePlayQuizStore();

  useEffect(() => {
    const socket = getPlayQuizSocket();

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      updateConnected(true);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket closed");
      updateConnected(false);
    };

    socket.onerror = (e) => {
      console.error("WebSocket error", e);
      updateError("WebSocket error occurred");
    };

    socket.onmessage = (event) => {
      const message = safeParseJSON(event.data);
      const type = message?.type;

      switch (type) {
        case "CONNECTED":
          updatePublicQuizes(message.publicQuizes);
          break;
        case "JOINED":
          updateQuizName(message.quizName);
          updateScore(0);
          updatePlayers(message.players);
          navigate("/quiz/lobby");
          break;
        case "PENDING":
          updateQuizStartDelay(message.delay);
          break;
        case "START":
          updateCurrentQuestion(message.question);
          updateQuizState(message.quizState);
          navigate("/quiz");
          break;
        case "CURRENT_QUESTION":
          updateCurrentQuestion(message.question);
          updateQuizState(message.quizState);
          break;
        case "SCORE_UPDATE":
          updateScore(message.score);
          break;
        case "RESULT":
          updateQuizResult(message.result);
          resetQuiz();
          socket.close();
          navigate("/quiz/result");
          break;
        case "PUBLIC_QUIZ_UPDATE":
          updatePublicQuizes(message.publicQuizes);
          break;
        case "ERROR":
          updateError(message.message);
          break;
        default:
          break;
      }

      console.log("📩 Received:", message);
    };
  }, []);

  return <>{children}</>;
}
