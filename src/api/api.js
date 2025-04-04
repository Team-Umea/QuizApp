import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

export const watchQuiz = async (quizData) => {
  try {
    const response = await axios.put(API_ENDPOINTS.WATCHQUIZ, quizData);
    return response.data.quiz;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    return await axios.delete(`${API_ENDPOINTS.QUIZ}/${quizId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
