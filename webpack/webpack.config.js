const path = require("path");
const MyPlugins = require("./plugins/MyPlugins");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loaders/MyLoader"),
            options: {
              name: "DONE", // 将要变更的通过配置项传入
            },
          },
        ],
      },
    ],
  },
  plugins: [new MyPlugins({ name: "MyPlugins" })],
};
