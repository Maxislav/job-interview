const NODE_ENV = process.env.NODE_ENV || "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require("webpack");
//const io = require('socket.io-client');

const config = {
  entry: {
    //socket: './node_modules/socket.io-client/dist/socket.io.js',
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].build.js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
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
    //noParse: [  /io/ ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:{
              presets: [ 'es2016', 'react'],
              plugins: [
                ["transform-runtime", {
                "polyfill": true,
                "regenerator": true
              }],
                ['transform-decorators-legacy'], ['transform-object-rest-spread']]
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