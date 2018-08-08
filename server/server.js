const express = require('express')
const ReactDOMServer = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const app = express()
const isDev = process.env.NODE_ENV === 'development'

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
