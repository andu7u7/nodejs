// Importamos módulo nativo de Node.js con prefijo node: (Recomendando desde Node 16)
import fs from 'node:fs'
import fsp from 'node:fs/promises'

// readFile: Lee un archivo de forma asíncrona
fs.readFile('./archivo.txt', 'utf-8', (error, data) => { 
    if (error) console.log(error);
    console.log(data);
})

fs.readFile('./archivo2.txt', 'utf-8', (error, data) => { 
    if (error) console.log(error);
    console.log(data);
})

// fs/promises no necesita una función callback ya que trabaja con promesas
fsp.readFile('./archivo.txt', 'utf-8')
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log('Lectura de archivo con promesa finalizada'))