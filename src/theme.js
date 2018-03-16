import { asyncComponent } from "react-async-component";

export function getTheme(name) {
  return asyncComponent({
    resolve: () => import("./themes/" + name),
    LoadingComponent: () => "Loading Theme..."
  });
}
