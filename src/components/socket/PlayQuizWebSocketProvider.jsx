import { useEffect } from "react";
import usePlayQuizStore from "../../hooks/usePlayQuizStore";
import { getPlayQuizSocket } from "../../sockets/playQuizSocket";
import { safeParseJSON } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router";
import useConnectedPlayersStore from "../../hooks/useConnectedPlayersStore";
import useQuizStore from "../../hooks/useQuizStore";

export default function PlayQuizWebSocketProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    updateConnected,
    updateError,
    updateCurrentQuestion,
    updateScore,
    updateQuizName,
    updateQuizId,
    updateQuizState,
    updateQuizResult,
    updatePlayers,
    updateQuizStartDelay,
    updatePublicQuizes,
    updatePlayersColorMap,
    updateTime,
    resetQuiz,
  } = usePlayQuizStore();
  const { fetchQuizes } = useQuizStore();
  const { addQuizPlayers } = useConnectedPlayersStore();

  useEffect(() => {
    const socket = getPlayQuizSocket();

    socket.onopen = () => {
      updateConnected(true);
    };

    socket.onclose = () => {
      updateConnected(false);
    };

    socket.onerror = () => {
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
          updateQuizId(message.quizId);
          updateScore(0);
          updatePlayers(message.players);
          updatePlayersColorMap(message.playersColorMap);
          navigate("/quiz/lobby");
          break;
        case "PENDING":
          updateQuizStartDelay(message.delay);
          break;
        case "START":
          updateCurrentQuestion(message.question);
          updateQuizState(message.quizState);
          updateTime(message.time);
          navigate("/quiz");
          break;
        case "CURRENT_QUESTION":
          updateCurrentQuestion(message.question);
          updateQuizState(message.quizState);
          break;
        case "SCORE_UPDATE":
          updateScore(message.score);
          break;
        case "REMAINING_TIME":
          updateTime(message.time);
          break;
        case "RESULT":
          updateQuizResult(message.result);
          resetQuiz();
          navigate("/quiz/result");
          break;
        case "PUBLIC_QUIZ_UPDATE":
          updatePublicQuizes(message.publicQuizes);
          if (message.cancelled) {
            resetQuiz();
            navigate("/");
          }
          break;
        case "QUIZ_END":
          fetchQuizes();
          break;
        case "PLAYERS":
          addQuizPlayers(message.quizId, message.players);
          break;
        case "ERROR":
          updateError(message.message);
          break;
        default:
          break;
      }
    };
  }, [location]);

  return <>{children}</>;
}
