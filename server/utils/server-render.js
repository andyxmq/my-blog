const bootstrapper = require('react-async-bootstrapper')
const serialize = require('serialize-javascript')
const ejs = require('ejs')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = createApp(stores, routerContext, req.url)
    bootstrapper(app).then(() => {
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)
      if (routerContext.url) {
        res.writeHead(302, {
          Location: routerContext.url
        })
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      // res.send(template.replace('<!--app-->', content))
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.title.toString(),
        link: helmet.link.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
