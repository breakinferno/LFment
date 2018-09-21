const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'sdk'),
  entry: './src/index.js',
  // devtool: 'source-map',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'sdk/lib'),
    filename: 'sdk.js',
    publicPath: '/lib/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /^node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    hints: false
  }
}
