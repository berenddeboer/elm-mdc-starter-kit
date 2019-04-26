// webpack v4
const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {

  entry: {
    main: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: mode === "production" ? "[name].[chunkhash].js" : "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use:  [
          "css-hot-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader",
            options: {
            }
          },
          { loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer")({})
              ]
            }
          },
          { loader: "sass-loader",
            options: {
              includePaths: ["node_modules"]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /\.#.*/],
        use: [
          { loader: "elm-hot-webpack-loader",
            options: {
              includePaths: ["src"]
            }
          },
          {
            loader: "elm-webpack-loader",
            options: {
              cwd: __dirname,
              debug: false,
              optimize: false
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: mode === "production" ? "[name].[contenthash].css" : "[name].css",
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    port: 3009,
    inline: true,
    hot: true,
    stats: "errors-only",
    host: "localhost",
    proxy: {
      "/api": "http://localhost"
    }
  }

};
