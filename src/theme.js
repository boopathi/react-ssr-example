import { asyncComponent } from "react-async-component";

export function getTheme(name) {
  return asyncComponent({
    resolve: () => import("./themes/" + name),
    LoadingComponent: () => "Loading Theme..."
  });
}

export function getServerTheme(req) {
  return req.query ? req.query.theme : "foo";
}

export function getClientTheme(href) {
  const theme = new URL(href).searchParams.get("theme");
  return theme ? theme : "foo";
}
