// globalThis - Objeto global
// global - Objeto global de Node
// window - Objeto global de Browser
globalThis.console.log(globalThis);

// Importamos módulo ES6
// Los archivos de módulos ES6 deben tener la extensión .mjs
// Al importar un módulo ES6, se debe especificar la extensión
import suma from './suma.mjs'
console.log(suma([1,2,3,4,5,6,7,8,9,10]));