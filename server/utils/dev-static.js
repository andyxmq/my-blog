const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs')
const renderServer = require('./server-render')
var proxy = require('http-proxy-middleware')

// 获取template
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(response => resolve(response.data))
      .catch(reject)
  })
}

// wrap包装成 `(function(exports, require, __filename, __dirname){ ... bundle  })`
// 解决string 中无法引用react
const NativeModule = require('module')
const vm = require('vm')
const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}}
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

// 创建
const fs = new MemoryFs()
// 获取server端的bunlder
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig) // 启动webpack compiler，可以监听entry下面的文件
serverCompiler.outputFileSystem = fs

// const Module = module.constructor // module 的构造方法

let serverBundle // 最终要
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(error => console.log(error))
  stats.warnings.forEach(warning => console.warn(warning))

  // 获取bunldpath
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  // 安装memory-fs
  const bundle = fs.readFileSync(bundlePath, 'utf-8') // 读取出来是string 需要传入指定的编码格式

  // 解决bundle为string的问题
  // const m = new Module()
  // m._compile(bundle, 'server-entry.js') // 注意指定文件名
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})

module.exports = function (app) {
  app.use('/public', proxy({target: 'http://localhost:8888'}))
  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for compile, reflesh later')
    }
    getTemplate().then(template => {
      return renderServer(serverBundle, template, req, res)
    }).catch(next)
  })
}
