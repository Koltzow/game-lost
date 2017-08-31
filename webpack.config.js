var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
   app: ["./source/main.js"]
  },
  output: {
   path: path.resolve(__dirname, "build"),
   publicPath: "/assets/",
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
         }
     ]
  },
  stats: {
     colors: true
  },
  devtool: 'source-map'
};
