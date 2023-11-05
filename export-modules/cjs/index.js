// globalThis - Objeto global
// global - Objeto global de Node
// window - Objeto global de Browser
globalThis.console.log(globalThis);

// Importamos commonJS módulo
// Desestructuramos el objeto exportado (si es que exportamos un objeto)
// Los archivos de módulos CommonJS deben tener la extensión .js
// Al importar un módulo CommonJS, no se debe especificar la extensión
const {count} = require('./count')
console.log(count('Hola mundo'));