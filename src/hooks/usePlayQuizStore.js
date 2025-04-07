import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnected,
  setCode,
  setUsername,
  setScore,
  setCurrentQuestion,
} from "../store/playQuizSlice";

const usePlayQuizStore = (url) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.playQuiz);
  const connected = state.connected;

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
      dispatch(setConnected(true));
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
      dispatch(setConnected(false));
    };

    newSocket.onmessage = (event) => {
      let parsedMessage;

      try {
        parsedMessage = JSON.parse(event.data);
      } catch (error) {
        console.error(error);
      }
      console.log("Received message:", parsedMessage);
    };

    return () => {
      newSocket.close();
      dispatch(setConnected(false));
    };
  }, [dispatch, url]);

  const sendMessage = (message) => {
    if (connected && newSocket && newSocket.readyState === WebSocket.OPEN) {
      newSocket.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  };

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

  return {
    ...state,
    connected,
    sendMessage,
    updateUsername,
    updateCode,
    updateScore,
    updateCurrentQuestion,
  };
};

export default usePlayQuizStore;
