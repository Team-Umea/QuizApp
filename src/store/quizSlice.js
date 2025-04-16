import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { generateQuizName } from "../utils/helpers";

export const QUIZES_KEY = "quizAppQuizes";

const initialState = {
  quizes: JSON.parse(sessionStorage.getItem(QUIZES_KEY) || "[]"),
  newQuizName: "",
  loading: true,
  error: null,
};

export const fetchQuizes = createAsyncThunk("quizes/fetchQuizes", async () => {
  const response = await axios.get(API_ENDPOINTS.GETQUIZES, {
    withCredentials: true,
  });

  return response.data;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizes.fulfilled, (state, action) => {
        const quizes = action.payload.quizes;
        state.loading = false;
        state.error = null;

        state.quizes = quizes;
        state.newQuizName = generateQuizName(quizes);
        sessionStorage.setItem(QUIZES_KEY, JSON.stringify(quizes));
      })
      .addCase(fetchQuizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizes";
      });
  },
});

export default quizSlice.reducer;
