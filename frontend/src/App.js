import React from "react";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { auth } from "./reducers/auth.js";

import { AuthApp } from "./components/AuthApp.js";

const reducer = combineReducers({
  auth: auth.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <AuthApp />
    </Provider>
  );
};
