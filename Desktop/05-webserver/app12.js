const express = require('express')
const app = express()
const port = 8080

//utilizacion de hbs para el renderizado de la pagina web
app.set('view engine', 'hbs')

//este archivo necesita de la carpeta public3, ya que todos los archivos del templated se trasladaran a la carpeta de template para hacer un backup
//& poder empezzar en el trabajo de hbs (handlebars) para renderizar el sitio semi estatico
//Al momento de compilar el App12.js el sitio estara roto & saldra de la pagina de erro.
// el hbs me da la capacidad de reutikizar codigo


//Servir contenido estatico public3 donde esta el templated
app.use(express.static('public3'))

app.get('/', (req, res) => {
    res.send('Home.')
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