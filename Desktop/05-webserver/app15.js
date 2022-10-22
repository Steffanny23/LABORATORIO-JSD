const express = require('express')
const hbs = require('hbs')
require('dotenv').config();

const app = express()
const port = process.env.PORT


//utilizacion de Handlebars hbs para el renderizado de la pagina web
app.set('view engine', 'hbs')


//uso de parciales "codigo que se repite en mas de un lugar o paginas web"
hbs.registerPartials(__dirname + '/views/partials')


//Servir contenido estatico public3 donde esta el templated
app.use(express.static('public3'))

//Enviando argumentos a home2
app.get('/', (req, res) => {
    res.render('home3', {
        nombre: 'Steffanny',
        titulo: 'Curso de Node'
    })

})

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Steffanny',
        titulo: 'Curso de Node'
    })
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Steffanny',
        titulo: 'Curso de Node'
    })
})

app.get('/generic', (req, res) => {
    res.sendFile(__dirname + '/public3/generic.html')
})

app.get('/elements', (req, res) => {
    res.sendFile(__dirname + '/public3/elements.html')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});