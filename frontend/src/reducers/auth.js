import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    showSigninForm: true,
    isRegistered: false,
    user: {},
  },
  reducers: {
    toggleSigninForm: (state, action) => {
      state.showSigninForm = !state.showSigninForm;
    },
    logInUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = {
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
      };
    },
    logOutUser: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
    userRegistered: (state, action) => {
      state.isRegistered = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        accessToken: action.payload.accessToken,
      };
    },
  },
});
