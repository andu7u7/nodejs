// Conexión con el servidor - protocolo tcp (más rápido)
import net from 'node:net'

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

export default findAvailablePort;