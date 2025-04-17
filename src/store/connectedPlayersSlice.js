import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectedPlayers: {},
};

const connectedPlayersSlice = createSlice({
  name: "connectedPlayers",
  initialState,
  reducers: {
    setConnectedPlayers: (state, action) => {
      state.connectedPlayers = action.payload;
    },
    reset: (state) => {
      state.connectedPlayers = {};
    },
  },
});

export const { setConnectedPlayers, reset } = connectedPlayersSlice.actions;

export default connectedPlayersSlice.reducer;
