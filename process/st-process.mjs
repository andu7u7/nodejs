import readline from "node:readline/promises";
import process from "node:process";

const choices = ["piedra", "papel", "tijeras"];
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.on("exit", () => {
  process.stdout.write("Gracias por jugar! :D\n");
  readLine.close();
});

const displayMenu = () => {
  console.clear();
  console.log("===================================");
  console.log("Bienvenido a piedra papel o tijeras");
  console.log("===================================\n");
  console.log("Escriba que utilizará");
  console.log(`Las opciones son: ${choices.join(", ")}`);
};

const getUserOption = async () => {
  const userChoice = await readLine.question("Escriba su opción: ");
  if (!choices.includes(userChoice)) {
    process.stdout.write("Opción no válida\n");
    return getUserOption();
  }
  return userChoice;
};

const getMachineOption = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const promptPlayAgain = async () => {
  const playAgain = await readLine.question("¿Jugar de nuevo? (s/n): ");
  if (playAgain !== "s") process.exit(0);
  main();
};

const playGame = (usuario = "", maquina = "") => {
  process.stdout.write(`Elegiste: ${usuario}\n`);
  process.stdout.write(`La máquina eligió: ${maquina}\n`);
  if (usuario === maquina) {
    process.stdout.write("Empate\n");
  } else {
    if (
      (usuario === "piedra" && maquina === "tijeras") ||
      (usuario === "papel" && maquina === "piedra") ||
      (usuario === "tijeras" && maquina === "papel")
    ) {
      process.stdout.write("Ganaste\n");
    } else {
      process.stdout.write("Perdiste\n");
    }
  }
  promptPlayAgain();
};

const main = async () => {
  displayMenu();
  const userOption = await getUserOption();
  const optionMachine = getMachineOption();
  playGame(userOption, optionMachine);
};

main();
