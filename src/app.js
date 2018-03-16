import { createElement as h, Component } from "react";
import { asyncComponent } from "react-async-component";

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
      async2: null
    };
  }
  render() {
    return h("div", {}, [
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
            this.setState({ async2 });
          }
        },
        [
          "header",
          h(AsyncComponent, {
            key: "async"
          }),
          this.state.async2 ? h(this.state.async2, { key: "async2" }) : null
        ]
      )
    ]);
  }
}
