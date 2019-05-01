// webpack v4
const path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {

  const mode = options.mode === "production" ? "production" : "development";

  return {
    entry: {
      main: "./src/index.js",
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: mode === "production" ? "[name].js" : "[name].js",
    },

    devtool: "cheap-module-source-map",

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            { loader: "css-loader",
              options: {
                sourceMap: true,
              }
            },
            { loader: "postcss-loader",
              options: {
                ident: "postcss",
                sourceMap: true,
                plugins: [
                  require("autoprefixer")({})
                ]
              }
            },
            { loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: ["node_modules"]
              }
            }
          ]
        },
        {
          test: /\.html$/,
          exclude: [/node_modules/],
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
                optimize: mode === "production"
              }
            }
          ]
        }
      ]
    },

    plugins: [
      // Always clean /dist/ directory
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
        filename: mode === "production" ? "[name].css" : "[name].css",
      }),

      // Support hot reloading
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

  }

};
