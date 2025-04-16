import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnected,
  setCode,
  setUsername,
  setScore,
  setCurrentQuestion,
  setError,
  setQuizName,
  setQuizState,
  setQuizResult,
  reset,
  setPlayers,
  setQuizStartDelay,
  setPublicQuizes,
  setQuizId,
  setPlayersColorMap,
  setTime,
} from "../store/playQuizSlice";
import { getPlayQuizSocket } from "../sockets/playQuizSocket";

const usePlayQuizStore = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.playQuiz);
  const connected = state.connected;
  const code = state.code;
  const username = state.username;

  const socket = getPlayQuizSocket();

  const sendMessage = (message) => {
    const overrideDefault = !!(message["code"] && message["username"]);
    const controlledMessage = overrideDefault ? message : { ...message, username, code };

    if (connected && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(controlledMessage));
    }
  };

  const updateConnected = useCallback(
    (connected) => {
      dispatch(setConnected(connected));
    },
    [connected]
  );

  const updateUsername = useCallback(
    (username) => {
      dispatch(setUsername(username));
    },
    [dispatch]
  );

  const updateCode = useCallback(
    (code) => {
      dispatch(setCode(code));
    },
    [dispatch]
  );

  const updateScore = useCallback(
    (score) => {
      dispatch(setScore(score));
    },
    [dispatch]
  );

  const updateCurrentQuestion = useCallback(
    (currentQuestion) => {
      dispatch(setCurrentQuestion(currentQuestion));
    },
    [dispatch]
  );

  const updateQuizName = useCallback(
    (quizName) => {
      dispatch(setQuizName(quizName));
    },
    [dispatch]
  );

  const updateQuizId = useCallback(
    (quizId) => {
      dispatch(setQuizId(quizId));
    },
    [dispatch]
  );

  const updateQuizState = useCallback(
    (quizState) => {
      dispatch(setQuizState(quizState));
    },
    [dispatch]
  );

  const updateQuizResult = useCallback(
    (quizResult) => {
      dispatch(setQuizResult(quizResult));
    },
    [dispatch]
  );

  const updatePlayers = useCallback(
    (players) => {
      dispatch(setPlayers(players));
    },
    [dispatch]
  );

  const updateQuizStartDelay = useCallback(
    (quizStartDelay) => {
      dispatch(setQuizStartDelay(quizStartDelay));
    },
    [dispatch]
  );

  const updatePublicQuizes = useCallback(
    (pubicQuizes) => {
      dispatch(setPublicQuizes(pubicQuizes));
    },
    [dispatch]
  );

  const updatePlayersColorMap = useCallback(
    (playerColorMap) => {
      dispatch(setPlayersColorMap(playerColorMap));
    },
    [dispatch]
  );

  const updateTime = useCallback(
    (time) => {
      dispatch(setTime(time));
    },
    [dispatch]
  );

  const updateError = useCallback(
    (error) => {
      dispatch(setError(error));
    },
    [dispatch]
  );

  const resetQuiz = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    ...state,
    connected,
    sendMessage,
    updateConnected,
    updateUsername,
    updateCode,
    updateScore,
    updateCurrentQuestion,
    updateQuizName,
    updateQuizId,
    updateQuizState,
    updateQuizResult,
    updateTime,
    updateError,
    updatePlayers,
    updatePublicQuizes,
    updateQuizStartDelay,
    updatePlayersColorMap,
    resetQuiz,
  };
};

export default usePlayQuizStore;
