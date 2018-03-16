const webpack = require("webpack");
const path = require("path");

const outDir = path.join(__dirname, "build");
const mode = "development";

const clientConfig = {
  mode,
  entry: "./src/client.js",
  output: {
    filename: "client.js",
    path: outDir
  }
};

const serverConfig = {
  mode,
  target: "node",
  entry: "./src/server.js",
  output: {
    filename: "server.js",
    path: outDir,
    library: "server",
    libraryTarget: "commonjs2"
  }
};

module.exports = [clientConfig, serverConfig];
