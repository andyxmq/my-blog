const path = require('path')
const baseConfig = require('./webpack.base')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')

module.exports = webpackMerge(baseConfig, {
  target: 'node', // 目标环境node
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' //  value：amd cmd umd commjs gloabel
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': "'http://127.0.0.1:4444'"
    })
  ]
})
