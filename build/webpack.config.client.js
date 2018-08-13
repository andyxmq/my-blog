const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const webpackMerge = require('webpack-merge')

const isDev = process.env.NODE_ENV === 'development'
const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
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
    },
    proxy: {
      '/api': 'http://localhost:4444'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
