import { createSlice } from "@reduxjs/toolkit";

export const USERNAME_KEY = "quizAppUsername";
export const CODE_KEY = "quizAppCode";
const SCORE_KEY = "quizAppScore";
const CURRENT_QUESTIONS_KEY = "quizAppCurrentQuestion";
const QUIZ_NAME_KEY = "quizAppQuizname";
const QUIZ_STATE_KEY = "quizStateKey";

const initialState = {
  connected: false,
  username: localStorage.getItem(USERNAME_KEY) || "",
  code: sessionStorage.getItem(CODE_KEY) || "",
  score: JSON.parse(sessionStorage.getItem(SCORE_KEY) || "0"),
  currentQuestion: JSON.parse(sessionStorage.getItem(CURRENT_QUESTIONS_KEY) || "null"),
  quizName: sessionStorage.getItem(QUIZ_NAME_KEY) || "",
  quizState: JSON.parse(sessionStorage.getItem(QUIZ_STATE_KEY) || "null"),
  error: null,
};

const playQuizSlice = createSlice({
  name: "playQuiz",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    closeSocket: (state) => {
      state.connected = false;
    },
    setUsername: (state, action) => {
      const username = action.payload;
      state.username = username;
      localStorage.setItem(USERNAME_KEY, username);
    },
    setCode: (state, action) => {
      const code = action.payload;
      state.code = code;
      sessionStorage.setItem(CODE_KEY, code);
    },
    setScore: (state, action) => {
      const score = action.payload;
      state.score = score;
      sessionStorage.setItem(SCORE_KEY, JSON.stringify(score));
    },
    setCurrentQuestion: (state, action) => {
      const currentQuestion = action.payload;
      state.currentQuestion = currentQuestion;
      sessionStorage.setItem(CURRENT_QUESTIONS_KEY, JSON.stringify(currentQuestion));
    },
    setQuizName: (state, action) => {
      const quizName = action.payload;
      state.quizName = quizName;
      sessionStorage.setItem(QUIZ_NAME_KEY, quizName);
    },
    setQuizState: (state, action) => {
      const quizState = action.payload;
      state.quizState = quizState;
      sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setConnected,
  closeSocket,
  setUsername,
  setCode,
  setScore,
  setCurrentQuestion,
  setQuizName,
  setQuizState,
  setError,
} = playQuizSlice.actions;

export const selectConnected = (state) => state.playQuiz.connected;

export default playQuizSlice.reducer;
