const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'sdk'),
  entry: './index.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'sdk.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /^node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
}
