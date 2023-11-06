import process from 'node:process';
// Conexion con el servidor - protocolo http
import http from 'node:http'

// Conexión con el servidor - protocolo tcp (más rápido)
import net from 'node:net'

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

// Funcion para encontrar un puerto disponible
const findAvailablePort = (port) => {
    return new Promise((resolve, reject) => {
        const serverNet = net.createServer();
        serverNet.listen(port, () => {
            const { port } = serverNet.address();
            serverNet.close(() => {
                resolve(port);
            });
        });
        serverNet.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                findAvailablePort(0).then((port) => resolve(port));
            }
            reject(error);
        });
    });
};

findAvailablePort(process.env.PORT).then((port) => {
    server.listen(port);
});