const express = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express')
const ReactDOMServer = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-dom/server')
const favicon = require('C:/Users/andy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/serve-favicon')
const fs = require('fs')
const path = require('path')
const app = express()
const isDev = process.env.NODE_ENV === 'development'

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 指定静态文件指定的返回
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactDOMServer.renderToString(serverEntry)
    res.send(template.replace('<!--app-->', appString))
  })
} else {
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.listen(4444, function () {
  console.log('server is listening on 4444')
})
