import axios from "axios";
import { ENDPOINTS } from "./endpoints";

export const requestVerificationCode = async ({ user }) => {
  const data = { user };
  try {
    return await axios.post(ENDPOINTS.REQUESTCODE, data);
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade vid begäran om verifieringskod."
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const verifyVerificationCode = async ({ user, verificationCode }) => {
  const data = { user, verificationCode };

  try {
    const response = await axios.post(ENDPOINTS.VERIFYCODE, data);

    if (!response.data.success) {
      throw new Error("Ogiltig kod");
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade vid verifiering av verifieringskod."
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const validateSecurityQuestion = async ({ user, questionAnswer }) => {
  const data = { user, questionAnswer };
  try {
    return await axios.post(ENDPOINTS.VALIDATEQUESTION, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade vid validering av säkerhetsfråga."
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const signIn = async ({ user, verificationCode, password, rememberUser }) => {
  const data = { user, verificationCode, password, rememberUser };

  try {
    return await axios.post(ENDPOINTS.SIGNIN, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Ett fel inträffade vid inloggning.");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const signOut = async () => {
  try {
    return await axios.get(ENDPOINTS.SIGNOUT);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Ett fel inträffade vid utloggning.");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
