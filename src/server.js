import { createElement as h } from "react";
import ReactDOMServer from "react-dom/server";
import root from "./app";
import {
  AsyncComponentProvider,
  createAsyncContext
} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";
import { getTheme } from "./theme";

export default req => {
  const asyncContext = createAsyncContext();

  const themeName = req.query ? req.query.theme : "foo";

  const app = h(
    AsyncComponentProvider,
    {
      asyncContext
    },
    h(root, {
      themeName,
      theme: getTheme(themeName)
    })
  );

  return asyncBootstrapper(app).then(() => {
    return {
      html: ReactDOMServer.renderToString(app),
      state: asyncContext.getState()
    };
  });
};
