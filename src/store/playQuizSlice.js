import { createSlice } from "@reduxjs/toolkit";

export const USERNAME_KEY = "quizAppUsername";
export const CODE_KEY = "quizAppCode";
const SCORE_KEY = "quizAppScore";
const CURRENT_QUESTIONS_KEY = "quizAppCurrentQuestion";
const QUIZ_NAME_KEY = "quizAppQuizname";
const QUIZ_STATE_KEY = "quizAppStateKey";
const QUIZ_RESULT_KEY = "quizAppResultKey";
const PLAYERS_KEY = "quizAppPlayers";

const initialState = {
  connected: false,
  username: localStorage.getItem(USERNAME_KEY) || "",
  code: sessionStorage.getItem(CODE_KEY) || "",
  score: JSON.parse(sessionStorage.getItem(SCORE_KEY) || "0"),
  currentQuestion: JSON.parse(sessionStorage.getItem(CURRENT_QUESTIONS_KEY) || "null"),
  quizName: sessionStorage.getItem(QUIZ_NAME_KEY) || "",
  quizState: JSON.parse(sessionStorage.getItem(QUIZ_STATE_KEY) || "null"),
  quizResult: JSON.parse(sessionStorage.getItem(QUIZ_RESULT_KEY) || "[]"),
  players: JSON.parse(sessionStorage.getItem(PLAYERS_KEY) || "[]"),
  quizStartDelay: null,
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
    setQuizResult: (state, action) => {
      const quizResult = action.payload;
      state.quizResult = quizResult;
      sessionStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(quizResult));
    },
    setPlayers: (state, action) => {
      const players = action.payload;
      state.players = players;
      sessionStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    },
    setQuizStartDelay: (state, action) => {
      const quizStartDelay = action.payload;
      state.quizStartDelay = quizStartDelay;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reset: (state) => {
      state.code = "";
      state.score = 0;
      state.quizName = "";
      state.currentQuestion = null;
      state.quizState = null;
      state.connected = false;
      state.quizStartDelay = null;
      state.error = null;

      sessionStorage.removeItem(CODE_KEY);
      sessionStorage.removeItem(SCORE_KEY);
      sessionStorage.removeItem(QUIZ_NAME_KEY);
      sessionStorage.removeItem(CURRENT_QUESTIONS_KEY);
      sessionStorage.removeItem(QUIZ_STATE_KEY);
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
  setQuizResult,
  setPlayers,
  setQuizStartDelay,
  setError,
  reset,
} = playQuizSlice.actions;

export const selectConnected = (state) => state.playQuiz.connected;

export default playQuizSlice.reducer;
