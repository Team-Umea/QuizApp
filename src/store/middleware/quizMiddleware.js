import { fetchQuizes } from "../quizSlice";

const getQuizes = (store) => (next) => (action) => {
  if (action.type === "FETCH_QUIZES") {
    store.dispatch(fetchQuizes());
  }

  return next(action);
};

export default getQuizes;
