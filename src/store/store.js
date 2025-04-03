import { configureStore, combineReducers } from "@reduxjs/toolkit";
import verifyAuth from "./middleware/authMiddleware";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
import getQuizes from "./middleware/quizMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth, getQuizes),
});

export default store;
