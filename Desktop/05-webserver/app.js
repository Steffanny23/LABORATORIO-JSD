//Se requiere el paquete http
const http = require('http')


//creando el webServer
http.createServer((req, res) => {

        res.write('Hola Mundo');
        res.end();
    })
    .listen(8080)

console.log('Escuchando el puerto', 8080);