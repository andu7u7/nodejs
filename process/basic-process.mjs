import process from "node:process";

// Argumentos de entrada (al ejecutar el programa o comando)
// Devuelve un [] string de toda la línea de comandos y sus argumentos
// Si no pasamos argumentos solo devuelve ['ruta del ejecutable (node)', 'ruta del archivo (programa)']
console.log(process.argv);

// Escuchar eventos
process.on("exit", (code) => {
  // Cuando se ejecute exit se ejecutará esta función
  console.log(`El proceso terminó con el código ${code}`);
});

// Actual ruta donde se ejecuta el programa
console.log(process.cwd());

// Variables de entorno
// NODE_ENV=production node process.mjs
console.log(process.env.NODE_ENV || "development");

// Terminar el proceso
process.exit(0); // <--- 0 es correcto, 1 es error
