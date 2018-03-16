import { createElement as h } from "react";
import ReactDOMServer from "react-dom/server";
import root from "./app";
import {
  AsyncComponentProvider,
  createAsyncContext
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";

export default () => {
  const asyncContext = createAsyncContext();
  const app = h(
    AsyncComponentProvider,
    {
      asyncContext
    },
    h(root)
  );

  return asyncBootstrapper(app).then(() => {
    return {
      html: ReactDOMServer.renderToString(app),
      state: asyncContext.getState()
    };
  });
};
