import express from 'express'
import crypto from 'node:crypto'
import movies from './movies.json' assert { type: 'json' };
import { validateMovie, validatePartialMovie } from './schemas/movie.mjs'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const port = process.env.PORT || 0
const app = express()
app.disable('x-powered-by')

// Middleware para parsear el body de las peticiones
app.use(express.json())

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ statusMessage: ReasonPhrases.OK })
})

app.get('/movies', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
  console.log(`http://localhost:${port}`)
})

app.use((req, res, next) => {
  res.redirect('/')
})
