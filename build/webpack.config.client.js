const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public' // 静态资源引用路径 区分静态资源
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', //  可以使用任何方式访问IP localhost 127.0.0.1
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), //  webpack处理的静态文件
    hot: true, // 启动hot module replacement
    overlay: { // 出现错误在网页显示黑色的错误
      errors: true
    },
    publicPath: '/public', // 解决静态文件无法访问，与output中publicPath 保持一致
    historyApiFallback: { // 解决错误路径
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
