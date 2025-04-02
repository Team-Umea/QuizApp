import axios from "axios";
import { AUTHECHO_ENDPOINTS } from "./endpoints";

export const requestVerificationCode = async ({ user }) => {
  const data = { user };
  try {
    return await axios.post(AUTHECHO_ENDPOINTS.REQUESTCODE, data);
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
    const response = await axios.post(AUTHECHO_ENDPOINTS.VERIFYCODE, data);

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
    return await axios.post(AUTHECHO_ENDPOINTS.VALIDATEQUESTION, data);
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
    return await axios.post(AUTHECHO_ENDPOINTS.SIGNIN, data);
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
    const res = await axios.get(AUTHECHO_ENDPOINTS.SIGNOUT);
    console.log(res);
  } catch (error) {
    console.log("Error: ", err);

    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Ett fel inträffade vid utloggning.");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
