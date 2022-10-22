const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Home Page...')
})

app.get('/hola-mundo', function(req, res) {
    res.send('Hola Mundo en su respectiva Ruta...')
})

app.listen(8080);