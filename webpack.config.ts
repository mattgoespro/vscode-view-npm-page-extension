import path from "path";
import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default {
  target: "node",
  mode: "none",
  devtool: "nosources-source-map",
  entry: "./src/extension.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "esbuild-loader",
          },
        ],
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  externals: {
    vscode: "commonjs vscode",
  },
} satisfies Configuration;
