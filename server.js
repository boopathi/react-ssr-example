const express = require("express");
const app = express();
const serialize = require("serialize-javascript");

const template = (html, state) => `
<body>
  <div id="root">${html}</div>
  <script>
    window.__MYSTATE__ = ${serialize(state)};
  </script>
  <script src="client.js"></script>
</body>
`;

app.use(express.static("build"));

app.get("/*", (req, res) => {
  const serverEntry = require("./build/server").default;

  serverEntry().then(({ html, state }) => {
    res.end(template(html, state));
  });
});

app.listen(8080, () => console.log("listening"));
