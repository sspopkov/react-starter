const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      port: process.env.PORT || 3000,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            target: "es2015",
          },
        },
        {
          test: /\.(png|jpg|woff|woff2|eot|ttf)$/,
          type: "asset/resource",
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(svg)$/,
          use: ["@svgr/webpack", "file-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      alias: {
        "~": path.resolve(__dirname, "src"),
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        favicon: path.resolve(__dirname, "public/favicon.ico"),
      }),
      new webpack.EnvironmentPlugin({
        BASE_PATH: process.env.BASE_PATH,
        BACKEND_URL: process.env.BACKEND_URL,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            },
          },
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: "single",
    },
  };
};
