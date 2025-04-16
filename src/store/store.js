import { configureStore, combineReducers } from "@reduxjs/toolkit";
import verifyAuth from "./middleware/authMiddleware";
import getQuizes from "./middleware/quizMiddleware";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
import playQuizReducer from "./playQuizSlice";
import connectedPlayersReducer from "./connectedPlayersSlice";
import createQuizReducer from "./createQuizSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  playQuiz: playQuizReducer,
  connectedPlayers: connectedPlayersReducer,
  createQuiz: createQuizReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth, getQuizes),
});

export default store;
