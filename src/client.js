import { createElement as h } from "react";
import ReactDOM from "react-dom";
import root from "./app";
import {
  AsyncComponentProvider,
  createAsyncContext
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";

const state = window.__MYSTATE__;

const app = h(
  AsyncComponentProvider,
  {
    rehydrateState: state
  },
  h(root)
);

asyncBootstrapper(app).then(() => {
  ReactDOM.hydrate(app, document.getElementById("root"));
});
