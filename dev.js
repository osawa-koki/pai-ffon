const esbuild = require('esbuild')
const httpServer = require('http-server')

const PORT = 8000

const server = httpServer.createServer({
  root: './public/',
  cache: -1
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})

esbuild.context({
  entryPoints: ['./src/index.ts'],
  outfile: './public/index.js',
  bundle: true,
  platform: 'browser',
  target: 'ES2022'
})
  .then((ctx) => {
    ctx.watch()
  })
