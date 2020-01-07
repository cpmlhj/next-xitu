

const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev, dir: '.' })
const proxy = require('http-proxy-middleware')
const handle = app.getRequestHandler()
const proxyTable = {
      '/api/**': {
            target: 'https://extension-ms.juejin.im/resources',
            pathRewrite: {'^/api': '/'},
            changeOrigin: true
      }
}
app.prepare().then(() => {
      const server = express()
      Object.keys(proxyTable).forEach(k => server.use(proxy(k, proxyTable[k])))

      server.all('*', (req, res) => {
            console.log(req.url, '================')
            return handle(req, res)
      })

      server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:3000`)
      })
})
