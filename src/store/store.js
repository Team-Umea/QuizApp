import { configureStore, combineReducers } from "@reduxjs/toolkit";
import verifyAuth from "./middleware/authMiddleware";
import getQuizes from "./middleware/quizMiddleware";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
import playQuizReducer from "./playQuizSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  playQuiz: playQuizReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth, getQuizes),
});

export default store;
