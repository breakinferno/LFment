const path = require('path')
/**
 * 考虑将axios和一些库external,不一起打包。
 */
module.exports = {
  entry: {
    LFSDK:  './src/index.js'
  },
  // devtool: 'source-map',
  mode: 'production',
  target: 'node',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    umdNamedDefine: true,
    globalObject: 'this', // 兼容node和浏览器运行，避免window is not undefined情况
    library: 'LFSDK',     // 库名称
    libraryTarget: 'umd', // 通用模块定义（）
    // libraryExport: 'default' // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /^node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  performance: {
    hints: false
  }
}
