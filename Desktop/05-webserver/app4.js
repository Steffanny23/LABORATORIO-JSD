/**
 * Instalar en este proyecto EXPRESS 
 * npm i install express
 * 
 */

const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Hola Mundo :) ')
})

app.listen(8080)