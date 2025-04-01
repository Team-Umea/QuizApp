import { configureStore, combineReducers } from "@reduxjs/toolkit";
import verifyAuth from "./middleware/authMiddleware";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth),
});

export default store;
