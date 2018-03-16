import { createElement as h } from "react";
import ReactDOM from "react-dom";
import root from "./app";
import {
  AsyncComponentProvider,
  createAsyncContext,
  asyncComponent
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";
import { getTheme, getClientTheme } from "./theme";

const state = window.__MYSTATE__;

const app = h(
  AsyncComponentProvider,
  {
    rehydrateState: state
  },
  h(root, {
    theme: getTheme(getClientTheme(window.location.href))
  })
);

asyncBootstrapper(app).then(() => {
  ReactDOM.hydrate(app, document.getElementById("root"));
});
