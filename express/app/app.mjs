import express from 'express'
import crypto from 'node:crypto'
import movies from './movies.json' assert { type: 'json' };
import { validateMovie, validatePartialMovie } from './schemas/movie.mjs'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const port = process.env.PORT || 0
const app = express()
app.disable('x-powered-by')

// Nota: la biblioteca cors puede ayudar al proceso, leer documentación
const ALLOW_ORIGIN_ADDRESS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8080'
]

// Middleware para parsear el body de las peticiones
app.use(express.json())

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ statusMessage: ReasonPhrases.OK })
})

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  let total = 0
  if (req.query?.genre) {
    // Recuperamos los query params
    const { genre } = req.query
    const filteredMovies = movies.filter((m) => m.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
    total = filteredMovies.length
    if (total) res.json({ total, statusMessage: ReasonPhrases.OK, movies: filteredMovies })
    else res.status(StatusCodes.NOT_FOUND).json({ statusMessage: ReasonPhrases.NOT_FOUND, message: `Genre ${genre} not found` })
  }
  total = movies.length
  res.json({ total, statusMessage: ReasonPhrases.OK, movies })
})

// Nota: por detrás usa regex para saber cuales serán params
app.get('/movies/:id', (req, res) => {
  // Recuperamos el parámetro id de la URL
  const { id } = req.params
  const movie = movies.find((m) => m.id === id)
  if (movie) res.json(movie)
  else res.status(404).json({ message: `Movie #${id} not found` })
})

app.post('/movies', (req, res) => {
  const movieSchema = validateMovie(req.body)
  if (!movieSchema.success) {
    // Nota: debemos parsear el error
    return res.status(400).json(JSON.parse(movieSchema.error))
  }

  // Al tener el middleware de express.json() podemos acceder a req.body
  // const { title, year, director, duration, poster, genre, rate } = req.body
  const movie = {
    id: crypto.randomUUID(),
    ...movieSchema.data
  }
  movies.push(movie)
  res.status(201).json(movie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(result.error))
  }
  const { id } = req.params
  const movie = movies.find((m) => m.id === id)
  if (!movie) return res.status(StatusCodes.NOT_FOUND).json({ message: `Movie #${id} not found` })
  const updatedMovie = { ...movie, ...result.data }
  movies.splice(movies.indexOf(movie), 1, updatedMovie)
  res.json(updatedMovie)
})

app.delete('movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((m) => m.id === id)
  if (!movie) return res.status(StatusCodes.NOT_FOUND).json({ message: `Movie #${id} not found` })
  movies.splice(movies.indexOf(movie), 1)
  res.send()
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
  console.log(`http://localhost:${port}`)
})

// Función que se llama por solicitudes complejas (PUT, DELETE, PATCH)
app.options('*', (req, res) => {
  // Obtenemos el origin de donde se realiza la solicitud
  const origin = req.headers.origin
  // Si el origin no existe es porque es el mismo servidor
  if (!origin || ALLOW_ORIGIN_ADDRESS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
  }
  res.json({})
})

app.use((req, res, next) => {
  res.redirect('/')
})
