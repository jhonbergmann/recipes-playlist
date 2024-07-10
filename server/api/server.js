const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  }),
)

server.use(router)

server.listen(3000, () => {
  console.log('server started successfully. listening on port 3000, http://localhost:3000')
})

module.exports = server
