import fs from 'node:fs/promises'
import process from 'node:process';
import path from 'node:path';

// Para ejecutar el programa: node ./../ls-app/ls.mjs ~/nodejs/file-system/

// Obtener la ruta ruta donde se está ejecutando el programa
const currentPath = process.argv[2] ?? process.cwd();
listar(currentPath);

async function listar(directoryPath) {
    let files
    try {
        fs.stat(directoryPath); // <--- Stat devuelve info del archivo o directorio (si da error no existe) 
        files = await fs.readdir(directoryPath);
    } catch (error) {
        process.exit(1);
    }
    const filesPromises = files.map(async (file) => {
        // Obtenemos la ruta completa de cada archivo o directorio
        const filePath = path.join(directoryPath, file);
        let fileStat;
        try {
            // Verificamos que exista cada archivo o directorio
            fileStat = await fs.stat(filePath);
        } catch (error) {
            process.exit(1);
        }
        // Utilizamos la información de stat
        const fileType = fileStat.isDirectory() ? 'd' : 'f';
        const fileModifed = fileStat.mtime.toLocaleString();
        return `${fileType} ${filePath} ${fileModifed}`;
    });
    // Resolvemos las promesas de forma paralela
    const filesData = await Promise.all(filesPromises);
    filesData.forEach((file) => console.log(file));
};

// Controlamos el evento exit
process.on('exit', (code) => {
    if (code === 1) console.error(`No se pudo listar el contenido de ${currentPath}`)
});