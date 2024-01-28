import { createSlice } from "@reduxjs/toolkit";

export const MemberInfoSlice = createSlice({
  name: "memberInfo",
  initialState: {
    userId: null,
    email: null,
    nick: null,
    name: null,
    gender: null,
    birthDate: null,
    userType: null,
    imageUrl: null,
  },
  reducers: {
    SET_MEMBER_INFO: (state, action) => {
      const data = action.payload;
      state.userId = data.userId;
      state.email = data.email;
      state.nick = data.nick;
      state.name = data.name;
      state.gender = data.gender;
      state.birthDate = data.birthDate;
      state.userType = data.userType;
      state.imageUrl = data.imageUrl;
    },
    DELETE_MEMBER_INFO: (state) => {
      state.userId = null;
      state.email = null;
      state.nick = null;
      state.name = null;
      state.gender = null;
      state.birthDate = null;
      state.userType = null;
      state.imageUrl = null;
    },
  },
});

export const { SET_MEMBER_INFO, DELETE_MEMBER_INFO } = MemberInfoSlice.actions;

export default MemberInfoSlice.reducer;
