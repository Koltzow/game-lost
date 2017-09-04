var path = require('path');
var webpack = require('webpack');
var PugLoader = require('pug-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "./source/main.js",
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  plugins: [
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    ecma: 6,
    mangle: true,
  })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.pug$/,
        loaders: 'pug-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './source/index.pug',
    })
  ],
  stats: {
     colors: true
  },
  devtool: 'source-map'
};
