const express = require('express')
const app = express()
const port = 8080


//Servir contenido estatico public2 donde esta el templated
app.use(express.static('public2'))


app.get('/', (req, res) => {
    res.send('Home Page...')
})

app.get('/hola-mundo', (req, res) => {
    res.send('Hola Mundo en su respectiva Ruta...')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});