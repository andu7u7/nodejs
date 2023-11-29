import readline from "node:readline";
import process from "node:process";

const opciones = ["piedra", "papel", "tijeras"];

// Menu Inicial
const mostrarMenu = () => {
  console.clear();
  console.log("===================================");
  console.log("Bienvenido a piedra papel o tijeras");
  console.log("===================================\n");
  console.log("Escriba que utilizará");
  console.log(`Las opciones son: ${opciones.join(", ")}`);
};

let opcionUsuario = "";
mostrarMenu();
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.question("Escriba su opción: ", (opcion) => {
  if (!opciones.includes(opcion)) {
    process.stdout.write("Opción no válida\n");
    process.exit(1);
  }
  opcionUsuario = opcion;
  process.stdout.write(`Elegiste ${opcion}\n`);
  readLine.close();
});
