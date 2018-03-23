const NODE_ENV = process.env.NODE_ENV || "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require("webpack");

const config = {
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].build.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devtool: NODE_ENV == 'dev' ? 'source-map' : false,
  devServer : {
    contentBase:  '/src'
  },
  resolve: {
    extensions: ['.js', '.jsx'],

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:{
              presets: [ 'env', 'react'],
              plugins: [
                ["transform-runtime", {
                "polyfill": false,
                "regenerator": true
              }],
                ['transform-decorators-legacy']]
            }
          }

        ],
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: true },
          },
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  }
}

module.exports = config