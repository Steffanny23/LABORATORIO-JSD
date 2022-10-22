const express = require('express')
const app = express()
const port = 8080


//utilizacion de Handlebars hbs para el renderizado de la pagina web
app.set('view engine', 'hbs')

//Servir contyenido estatico public3 donde esta el templated
app.use(express.static('public3'))


//Enviando argumentos a home2
app.get('/', (req, res) => {
    res.render('home2', {
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