const axios = require('../../node_modules/_axios@0.18.0@axios')
const path = require('path')
const MemoryFs = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/memory-fs')
const ReactDomServer = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-dom/server')
var proxy = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/http-proxy-middleware')
// 获取template
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(response => resolve(response.data))
      .catch(reject)
  })
}

// 创建
const fs = new MemoryFs()
// 获取server端的bunlder
const webpack = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/webpack')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig) // 启动webpack compiler，可以监听entry下面的文件
serverCompiler.outputFileSystem = fs

const Module = module.constructor // module 的构造方法

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
  const m = new Module()
  m._compile(bundle, 'server-entry.js') // 注意指定文件名
  serverBundle = m.default
})

module.exports = function (app) {
  app.use('/public', proxy({target: 'http://localhost:8888'}))
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!--app-->', content))
    })
  })
}
