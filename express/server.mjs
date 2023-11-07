import http from 'node:http'
import process from 'node:process'

const users = [
    {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@example.com",
        edad: 30
    },
    {
        id: 2,
        nombre: "María García",
        email: "maria@example.com",
        edad: 25
    },
    {
        id: 3,
        nombre: "Carlos Rodríguez",
        email: "carlos@example.com",
        edad: 35
    },
    {
        id: 4,
        nombre: "Luisa Martínez",
        email: "luisa@example.com",
        edad: 28
    },
    {
        id: 5,
        nombre: "Pedro López",
        email: "pedro@example.com",
        edad: 32
    },
    {
        id: 6,
        nombre: "Ana Sánchez",
        email: "ana@example.com",
        edad: 29
    },
    {
        id: 7,
        nombre: "Miguel González",
        email: "miguel@example.com",
        edad: 27
    },
    {
        id: 8,
        nombre: "Laura Torres",
        email: "laura@example.com",
        edad: 31
    },
    {
        id: 9,
        nombre: "Ricardo Díaz",
        email: "ricardo@example.com",
        edad: 33
    },
    {
        id: 10,
        nombre: "Isabel Fernández",
        email: "isabel@example.com",
        edad: 26
    }
];

const processRequest = (req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const text = JSON.stringify({ message: 'Hello World' });
        res.end(text);
    } else if (req.url === '/users') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const text = JSON.stringify(users);
        res.end(text);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const text = JSON.stringify({ message: 'Page not found!' });
        res.end(text);
    }
}

const server = http.createServer(processRequest);

server.listen(process.env.PORT || 0, () => {
    const { port } = server.address();
    console.log(`Server started on port ${port}`);
    console.log(`http://localhost:${port}`)
})
