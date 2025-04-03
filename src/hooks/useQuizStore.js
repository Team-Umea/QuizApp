import { useDispatch, useSelector } from "react-redux";

const useQuizStore = () => {
  const dispath = useDispatch();
  const authState = useSelector((state) => state.quiz);

  const fetchQuizes = () => {
    dispath({ type: "FETCH_QUIZES" });
  };

  return {
    ...authState,
    fetchQuizes,
  };
};

export default useQuizStore;
