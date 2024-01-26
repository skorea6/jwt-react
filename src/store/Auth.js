import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
    userId: null,
    email: null,
    nick: null,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      const jwtData = jwtDecode(action.payload);
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = jwtData.exp;
      state.userId = jwtData.userId;
      state.email = jwtData.email;
      state.nick = jwtData.nick;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
      state.userId = null;
      state.email = null;
      state.nick = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
