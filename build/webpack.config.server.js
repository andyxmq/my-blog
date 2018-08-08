const path = require('path')
const baseConfig = require('./webpack.base')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(baseConfig, {
  target: 'node', // 目标环境node
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' //  value：amd cmd umd commjs gloabel
  }
})
