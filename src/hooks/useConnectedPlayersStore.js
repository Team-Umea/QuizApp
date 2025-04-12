import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, setConnectedPlayers } from "../store/connectedPlayersSlice";

const useConnectedPlayersStore = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.connectedPlayers);

  const addQuizPlayers = useCallback(
    (quizId, players) => {
      const currentConnectedPlayers = state.connectedPlayers || {};

      const updatedConnectedPlayers = {
        ...currentConnectedPlayers,
        [quizId]: [...(currentConnectedPlayers[quizId] || []), ...players],
      };

      dispatch(setConnectedPlayers(updatedConnectedPlayers));
    },
    [dispatch, state]
  );

  const resetState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    ...state,
    addQuizPlayers,
    resetState,
  };
};

export default useConnectedPlayersStore;
