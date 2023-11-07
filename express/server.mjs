import http from 'node:http'
import process from 'node:process'
import { users } from './constants.mjs'

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const text = JSON.stringify({ message: 'Hello World' })
    res.end(text)
  } else if (req.url === '/users') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const text = JSON.stringify(users)
    res.end(text)
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const text = JSON.stringify({ message: 'Page not found!' })
    res.end(text)
  }
}

const server = http.createServer(processRequest)

server.listen(process.env.PORT || 0, () => {
  const { port } = server.address()
  console.log(`Server started on port ${port}`)
  console.log(`http://localhost:${port}`)
})
