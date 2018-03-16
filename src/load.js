import { Component, createElement as h } from "react";

export default importFactory =>
  class extends Component {
    constructor(...args) {
      super(...args);
      this.state = { Component: null };
    }

    componentWillMount() {
      if (this.state.Component == null) {
        importFactory().then(({ default: Component }) => {
          this.setState({
            Component
          });
        });
      }
    }
    render() {
      if (this.state.Component != null) {
        const { Component } = this.state;
        return h(Component, this.props);
      }
      return "Loading ...";
    }
  };
