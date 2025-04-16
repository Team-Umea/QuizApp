import { createSlice } from "@reduxjs/toolkit";
import { QUIZES_KEY } from "./quizSlice";
import { generateQuizName } from "../utils/helpers";

const initialState = {
  quiz: null,
  quizId: null,
  quizes: JSON.parse(sessionStorage.getItem(QUIZES_KEY) || "[]"),
  quizName: "",
  questions: [],
  editingQuestion: null,
};

const createQuizSlice = createSlice({
  name: "createQuiz",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      const quiz = action.payload;

      if (quiz) {
        const questions = quiz.questions;
        const quizName = quiz.quizName;
        const quizId = quiz._id;

        state.quiz = quiz;
        state.questions = questions;
        state.quizName = quizName;
        state.quizId = quizId;
      } else {
        state.quiz = null;
        state.questions = [];
        state.quizId = null;
        state.quizName = generateQuizName(state.quizes) || null;
      }

      state.editingQuestion = null;
    },
    setQuizId: (state, action) => {
      state.quizId = action.payload;
    },
    setQuizes: (state, action) => {
      const quizes = action.payload;
      state.quizes = quizes;
      state.quizName = generateQuizName(quizes);
      sessionStorage.setItem(QUIZES_KEY, JSON.stringify(quizes));
    },
    setQuizName: (state, action) => {
      state.quizName = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setEditingQuestion: (state, action) => {
      state.editingQuestion = action.payload;
    },
  },
});

export default createQuizSlice.reducer;

export const { setQuiz, setQuizId, setQuizes, setQuizName, setQuestions, setEditingQuestion } =
  createQuizSlice.actions;
