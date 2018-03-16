import { createElement as h, Component } from "react";
import { asyncComponent } from "react-async-component";
import { getTheme } from "./theme";

const AsyncComponent = asyncComponent({
  resolve() {
    return import("./async");
  },
  LoadingComponent() {
    return h("div", null, "loading ...");
  }
});

export default class extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      async2: null,
      themeName: this.props.themeName,
      theme: this.props.theme
    };
  }

  render() {
    return h(this.state.theme, {}, [
      h(
        "div",
        {
          key: "foo",
          onClick: () => {
            const async2 = asyncComponent({
              resolve() {
                return import("./async-2");
              },
              LoadingComponent() {
                return "Loading2 ...";
              }
            });

            const themeName = this.state.themeName === "foo" ? "bar" : "foo";
            console.log(themeName);

            const theme = getTheme(themeName);

            window.history.pushState(null, null, "/?theme=" + themeName);

            this.setState({ async2, themeName, theme });
          }
        },
        "header",
        h(AsyncComponent, {
          key: "async"
        }),
        this.state.async2 ? h(this.state.async2, { key: "async2" }) : null
      )
    ]);
  }
}
