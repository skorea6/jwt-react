import { createSlice } from "@reduxjs/toolkit";

export const EmailTokenSlice = createSlice({
  name: "emailToken",
  initialState: {
    token: null,
    email: null,
  },
  reducers: {
    SET_EMAIL_TOKEN: (state, action) => {
      const data = action.payload;
      state.token = data.verificationToken;
      state.email = data.email;
    },
    DELETE_EMAIL_TOKEN: (state) => {
      state.token = null;
      state.email = null;
    },
  },
});

export const { SET_EMAIL_TOKEN, DELETE_EMAIL_TOKEN } = EmailTokenSlice.actions;

export default EmailTokenSlice.reducer;
