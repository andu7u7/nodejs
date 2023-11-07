import express from 'express'
import movies from './movies.json' assert { type: 'json' };

const port = process.env.PORT || 0
const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/movies', (req, res) => {
    if (req.query?.genre) {
        // Recuperamos los query params
        const { genre } = req.query
        const filteredMovies = movies.filter((m) => m.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
        if (filteredMovies.length) res.json(filteredMovies)
        else res.json([])
    }
  res.json(movies)
})

// Nota: por detrás usa regex para saber cuales serán params
app.get('/movies/:id', (req, res) => {
    // Recuperamos el parámetro id de la URL
    const {id} = req.params
    const movie = movies.find((m) => m.id === id)
    if (movie) res.json(movie)
    else res.status(404).json({ message: `Movie #${id} not found` })
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
  console.log(`http://localhost:${port}`)
})

app.use((req, res, next) => {
  res.redirect('/')
})
