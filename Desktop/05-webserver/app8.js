const express = require('express')
const app = express()
const port = 8080

/**
 * Se creo carpeta public & dentro index.html
 * se creara un Middlware para habilitar ruta la index.html
 */

//Servir contenido estatico
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('Home Page...')
})

app.get('/hola-mundo', (req, res) => {
    res.send('Hola Mundo en su respectiva Ruta...')
})

app.get('*', (req, res) => {
    res.send('404 | Page NOT found...')

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});