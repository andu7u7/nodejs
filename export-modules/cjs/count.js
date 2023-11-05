// Módulo CommonJS
// Por defecto NodeJS utiliza CommonJS para importar y exportar módulos (file.js)

function count(message) { 
    return message.length;
}

// Podemos exportarlo como objeto
module.exports = {
    count
};