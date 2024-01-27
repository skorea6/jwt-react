import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobalStyle from "./assets/styles/GlobalStyle";
import store from "./store";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </CookiesProvider>
);
