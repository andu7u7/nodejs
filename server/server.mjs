import process from 'node:process';
import findAvailablePort from './findAvailablePort.mjs';
// Conexion con el servidor - protocolo http
import http from 'node:http'

// Para probar programa: PORT=1234 node server/server.mjs

// ================= HTTP PROTOCOL =================

// Crear el servidor
const server = http.createServer((_req, res) => {
    res.end('Bienvenido a tu servidor!');
});

// Escuchar el puerto 3000
// Nota: Si pasamos 0, se asignará el primero disponible
// server.listen(0, () => {
//     console.log(`Server is listening on port ${server.address().port}`);
// });

// Escuchar eventos
server.on('listening', () => {
    console.log(`Server is listening on port ${server.address().port}`);
    console.log(`Mira tu servidor aquí --> http://localhost:${server.address().port}`);
})

// ================= TCP PROTOCOL =================

findAvailablePort(process.env.PORT).then((port) => {
    server.listen(port);
});