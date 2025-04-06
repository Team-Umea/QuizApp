import axios from "axios";
import { QUIZ_ENDPOINTS } from "./endpoints";

export const runQuiz = async (quizId) => {
  try {
    return await axios.post(`${QUIZ_ENDPOINTS.RUNQUIZ}/${quizId}`);
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

export const cancelQuiz = async (quizId) => {
  try {
    return await axios.post(`${QUIZ_ENDPOINTS.CANCELQUIZ}/${quizId}`);
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
