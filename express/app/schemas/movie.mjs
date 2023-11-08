import zod from 'zod'

const movieSchema = zod.object({
  title: zod.string().min(1).max(255),
  year: zod.number().int().min(1888).max(2077),
  director: zod.string().min(1).max(255),
  duration: zod.number().int().min(1).max(300),
  poster: zod.string().url().endsWith('.jpg'),
  genre: zod.array(zod.string().min(1).max(255)),
  rate: zod.number().min(0).max(10).default(0)
})

export function validateMovie (movieObject) {
  // A diferencia de parse, safeParse retorna data o error en vez de lanzar una excepción
  return movieSchema.safeParse(movieObject)
}

export function validatePartialMovie (movieObject) {
  // Volvemos todas las propiedades opcionales
  return movieSchema.partial().safeParse(movieObject)
}
