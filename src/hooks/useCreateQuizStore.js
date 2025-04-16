import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditingQuestion,
  setQuestions,
  setQuiz,
  setQuizes,
  setQuizId,
  setQuizName,
} from "../store/createQuizSlice";

const useCreateQuizStore = () => {
  const dispath = useDispatch();
  const quizState = useSelector((state) => state.createQuiz);

  const updateQuiz = useCallback(
    (quiz) => {
      dispath(setQuiz(quiz));
    },
    [dispath]
  );

  const updateQuizId = useCallback(
    (quizId) => {
      dispath(setQuizId(quizId));
    },
    [dispath]
  );

  const updateQuizes = useCallback(
    (quies) => {
      dispath(setQuizes(quies));
    },
    [dispath]
  );

  const updateQuizName = useCallback(
    (quizName) => {
      dispath(setQuizName(quizName));
    },
    [dispath]
  );

  const updateQuestions = useCallback(
    (questions) => {
      dispath(setQuestions(questions));
    },
    [dispath]
  );

  const updateEditingQuestion = useCallback(
    (editingQuestion) => {
      dispath(setEditingQuestion(editingQuestion));
    },
    [dispath]
  );

  return {
    updateQuiz,
    updateQuizId,
    updateQuizes,
    updateQuizName,
    updateQuestions,
    updateEditingQuestion,
    quizState,
    ...quizState,
  };
};

export default useCreateQuizStore;
