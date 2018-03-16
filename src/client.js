import { createElement as h } from "react";
import ReactDOM from "react-dom";
import root from "./app";
import {
  AsyncComponentProvider,
  createAsyncContext,
  asyncComponent
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";
import { getTheme } from "./theme";

const state = window.__MYSTATE__;

const url = new URL(window.location.href);

let themeName = "foo";
for (const [key, value] of url.searchParams) {
  if (key === "theme") {
    themeName = value;
    break;
  }
}

const app = h(
  AsyncComponentProvider,
  {
    rehydrateState: state
  },
  h(root, {
    themeName,
    theme: getTheme(themeName)
  })
);

asyncBootstrapper(app).then(() => {
  ReactDOM.hydrate(app, document.getElementById("root"));
});
