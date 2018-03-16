import { createElement as h } from "react";
import ReactDOMServer from "react-dom/server";
import root from "./app";
import {
  AsyncComponentProvider,
  createAsyncContext
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";
import { getTheme, getServerTheme } from "./theme";

export default req => {
  const asyncContext = createAsyncContext();

  const app = h(
    AsyncComponentProvider,
    {
      asyncContext
    },
    h(root, {
      theme: getTheme(getServerTheme(req))
    })
  );

  return asyncBootstrapper(app).then(() => {
    return {
      html: ReactDOMServer.renderToString(app),
      state: asyncContext.getState()
    };
  });
};
