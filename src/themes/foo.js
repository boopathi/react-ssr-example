import { createElement as h } from "react";

export default ({ children }) =>
  h(
    "div",
    {
      style: {
        backgroundColor: "blue",
        color: "white"
      }
    },
    children
  );
