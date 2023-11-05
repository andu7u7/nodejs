import fs from "node:fs/promises";

// EMS puede ejecutar await en el scope global
const text = await fs.readFile("./archivo.txt", "utf-8");
console.log(text);

// Si no es un ESM usamos una IIFE (Immediately Invoked Function Expression)
(async () => {
  console.log("Leyendo archivo 1");
  const text = await fs.readFile("./archivo.txt", "utf-8");
  console.log(text);
})();
