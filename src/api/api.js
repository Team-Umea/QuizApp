import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

export const getQuiz = async (quizId) => {
  try {
    return await axios.put(`${API_ENDPOINTS.GETQUIZ}/${quizId}`, {
      withCredentials: true,
    });
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

export const watchQuiz = async (quizData) => {
  try {
    const response = await axios.put(API_ENDPOINTS.WATCHQUIZ, quizData, {
      withCredentials: true,
    });
    return response.data;
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

export const toggleQuizVisibility = async (quizId) => {
  try {
    return await axios.put(
      `${API_ENDPOINTS.TOGGLEQUIZVISIBILITY}/${quizId}`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);

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
    return await axios.delete(`${API_ENDPOINTS.QUIZ}/${quizId}`, {
      withCredentials: true,
    });
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

export const runQuiz = async (quizId) => {
  try {
    return await axios.post(
      `${API_ENDPOINTS.RUNQUIZ}/${quizId}`,
      {},
      {
        withCredentials: true,
      }
    );
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
    return await axios.post(
      `${API_ENDPOINTS.CANCELQUIZ}/${quizId}`,
      {},
      {
        withCredentials: true,
      }
    );
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

export const launchQuiz = async (quizId) => {
  try {
    return await axios.post(
      `${API_ENDPOINTS.LAUNCHQUIZ}/${quizId}`,
      {},
      {
        withCredentials: true,
      }
    );
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

export const getQuizResult = async (quizId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.QUIZRESULT}/${quizId}`, {
      withCredentials: true,
    });

    return response.data;
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
