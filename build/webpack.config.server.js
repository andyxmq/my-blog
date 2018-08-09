const path = require('path')
const baseConfig = require('./webpack.base')
const webpackMerge = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/webpack-merge')

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
