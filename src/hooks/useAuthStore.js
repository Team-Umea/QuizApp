import { useDispatch, useSelector } from "react-redux";
import {
  clearAuth,
  setEmail,
  setIsAdmin,
  setIsAuthenticated,
  setUserID,
  setUsername,
} from "../store/authSlice";
import { useCallback } from "react";

const useAuthStore = () => {
  const dispath = useDispatch();
  const authState = useSelector((state) => state.auth);

  const verifySession = useCallback(() => {
    if (!authState.isAuthenticated) {
      dispath({ type: "VERIFY_AUTH" });
    }
  }, [dispath, authState]);

  const updateIsAuthenticated = useCallback(
    (isAuthenticated) => {
      dispath(setIsAuthenticated(isAuthenticated));
    },
    [dispath]
  );

  const updateIsAdmin = useCallback(
    (isAdmin) => {
      dispath(setIsAdmin(isAdmin));
    },
    [dispath]
  );

  const updateUsername = useCallback(
    (username) => {
      dispath(setUsername(username));
    },
    [dispath]
  );

  const updateEmail = useCallback(
    (email) => {
      dispath(setEmail(email));
    },
    [dispath]
  );

  const updateUserID = useCallback(
    (userID) => {
      dispath(setUserID(userID));
    },
    [dispath]
  );

  const resetAuth = useCallback(() => {
    dispath(clearAuth());
  }, [dispath]);

  return {
    ...authState,
    verifySession,
    updateIsAuthenticated,
    updateIsAdmin,
    updateUsername,
    updateEmail,
    updateUserID,
    resetAuth,
  };
};

export default useAuthStore;
