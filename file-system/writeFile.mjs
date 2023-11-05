import fsp from 'node:fs/promises'

const content = "Hola Rossana, este es un archivo de texto creado con Node.js"

// Escribir un fichero
fsp.writeFile('./rossana.txt', content, { encoding: 'utf-8', flag: 'a' }).then(() => {
    console.log('Archivo creado')
}).catch((error) => {
    console.error('Error al crear el archivo', error)
});