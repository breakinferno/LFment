const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  devtool: 'source-map',
  mode: "production",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'LFment.min.js',
    libraryTarget: 'umd',
    library: 'LFment',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /^node_mocules/,
        loader: 'babel-loader',
      },
    ],
  },
}
