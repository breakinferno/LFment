const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'test'),
  entry: './test.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'test.js',
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
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8888'
    })
  ],
  devServer: {
    port: 8888,
    host: '127.0.0.1',
    contentBase: path.join(__dirname, './test'),
  },
}
