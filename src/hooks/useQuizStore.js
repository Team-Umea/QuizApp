import { useDispatch, useSelector } from "react-redux";

const useQuizStore = () => {
  const dispath = useDispatch();
  const state = useSelector((state) => state.quiz);

  const fetchQuizes = () => {
    dispath({ type: "FETCH_QUIZES" });
  };

  const getQuiz = (quizId) => state.quizes.find((quiz) => quiz._id === quizId);

  return {
    ...state,
    getQuiz,
    fetchQuizes,
  };
};

export default useQuizStore;
