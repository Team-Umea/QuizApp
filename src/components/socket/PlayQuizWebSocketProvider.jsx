// components/socket/PlayQuizWebSocketProvider.jsx
import { useEffect } from "react";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import { getPlayQuizSocket } from "../../sockets/playQuizSocket";
import { safeParseJSON } from "../../utils/helpers";
import { useNavigate } from "react-router";

export default function PlayQuizWebSocketProvider({ children }) {
  const navigate = useNavigate();
  const { updateConnected, updateError, updateCurrentQuestion, updateScore } = usePlayQuizStore();

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
        case "CURRENT_QUESTION":
          updateCurrentQuestion(message.question);

          if (message.isFirstQuestion) {
            navigate("quiz");
          }
          break;
        case "SCORE_UPDATE":
          updateScore(message.score);
          break;
        case "ERROR":
          updateError(message.message);
          break;
        default:
          break;
      }

      console.log("📩 Received:", message);
    };

    return () => {
      // updateConnected(false);
      // socket.close();
    };
  }, []);

  return <>{children}</>;
}
