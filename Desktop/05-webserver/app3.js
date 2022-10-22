const http = require('http')

//Enviando un archivo CSV, esto es una sola ruta.
http.createServer((req, res) => {
        res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
        res.writeHead(200, { 'Content-Type': 'application/csv' })

        res.write('id, nombre\n')
        res.write('1, Angie\n')
        res.write('2., Cian\n')
        res.write('3., Stev\n')
        res.write('4., Karla\n')
        res.end();
    })
    .listen(8080)

console.log('Escuchando el puerto', 8080);