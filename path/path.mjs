import path from 'node:path'

// Barra separada según el sistema operativo
console.log(path.sep)

// Devuelve la ruta según el sistema operativo
const filePath = path.join('path', 'to', 'file')
console.log(filePath)

// Devuelve el último elemento (fichero) de la ruta
const fileName = path.basename(filePath)
console.log(fileName)

// Devuelve el último elemento (fichero) de la ruta sin extensión
const fileNameWithoutExt = path.basename(filePath, '.mjs')
console.log(fileNameWithoutExt)

// Devuelve la extensión del fichero
const fileExt = path.extname('../file-system/archivo.txt')
console.log(fileExt)