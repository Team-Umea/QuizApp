import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { generateQuizName } from "../utils/helpers";

const initialState = {
  quizes: [],
  newQuizName: "",
  loading: true,
  error: null,
};

export const fetchQuizes = createAsyncThunk("quizes/fetchQuizes", async () => {
  const response = await axios.get(API_ENDPOINTS.GETQUIZES);
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
      })
      .addCase(fetchQuizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quizes";
      });
  },
});

export default quizSlice.reducer;
