import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTHECHO_ENDPOINTS } from "../api/endpoints";

const IS_AUTHENTICATED_KEY = "IS_AUTHENTICATED_KEY";
const IS_ADMIN_KEY = "IS_ADMIN_KEY";
const USERNAME_KEY = "USERNAME_KEY";
const EMAIL_KEY = "EMAIL_KEY";
const USER_ID_KEY = "USER_ID_KEY";

const initialState = {
  isAuthenticated: JSON.parse(sessionStorage.getItem(IS_AUTHENTICATED_KEY) || "false"),
  isAdmin: JSON.parse(sessionStorage.getItem(IS_ADMIN_KEY) || "false"),
  username: sessionStorage.getItem(USERNAME_KEY) || "",
  email: sessionStorage.getItem(EMAIL_KEY) || "",
  userID: sessionStorage.getItem(USER_ID_KEY) || "",
};

export const verifySession = createAsyncThunk("session/verifySession", async () => {
  const [sessionResponse, activityResponse] = await Promise.allSettled([
    axios.get(AUTHECHO_ENDPOINTS.VERIFYSESSION),
    axios.put(AUTHECHO_ENDPOINTS.TRACKACTIVITY),
  ]);

  return {
    session: sessionResponse.status === "fulfilled" ? sessionResponse.value.data : null,
    activity: activityResponse.status === "fulfilled" ? activityResponse.value.data : null,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      sessionStorage.setItem(IS_AUTHENTICATED_KEY, JSON.stringify(action.payload));
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      sessionStorage.setItem(IS_ADMIN_KEY, JSON.stringify(action.payload));
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      sessionStorage.setItem(USERNAME_KEY, action.payload);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      sessionStorage.setItem(EMAIL_KEY, action.payload);
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
      sessionStorage.setItem(USER_ID_KEY, action.payload);
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.username = "";
      state.email = "";
      state.userID = "";
      sessionStorage.removeItem(IS_AUTHENTICATED_KEY);
      sessionStorage.removeItem(IS_ADMIN_KEY);
      sessionStorage.removeItem(USERNAME_KEY);
      sessionStorage.removeItem(EMAIL_KEY);
      sessionStorage.removeItem(USER_ID_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifySession.fulfilled, (state, action) => {
      const { session } = action.payload;
      const isAuthenticated = session ? !!session.success : false;
      const isAdmin = session ? !!session.isAppAdmin : false;
      const username = session ? session.name : "";
      const email = session ? session.email : "";
      const userID = session ? session.userID : "";

      state.isAuthenticated = isAuthenticated;
      state.isAdmin = isAdmin;
      state.username = username;
      state.email = email;
      state.userID = userID;
      sessionStorage.setItem(IS_AUTHENTICATED_KEY, JSON.stringify(isAuthenticated));
      sessionStorage.setItem(IS_ADMIN_KEY, JSON.stringify(isAdmin));
      sessionStorage.setItem(USERNAME_KEY, username);
      sessionStorage.setItem(EMAIL_KEY, email);
      sessionStorage.setItem(USER_ID_KEY, userID);
    });
  },
});

export const { setIsAuthenticated, setIsAdmin, setUsername, setEmail, setUserID, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
