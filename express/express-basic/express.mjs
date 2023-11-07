import express from 'express'
import process from 'node:process'
import { users } from './constants.mjs'

const app = express()
// Quitamos de los headers que tecnología utilizamos
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 0

// Middleware (entra aquí antes de llegar a la ruta)
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url} ${req.headers['user-agent']}`)
  next()
})

app.get('/', (_req, res) => {
  res.status(200).type('application/json').json({ message: 'Servidor con Express' })
})

app.get('/users', (_req, res) => {
  res.status(200).send(users)
})

// Middleware de error
app.use((_req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
