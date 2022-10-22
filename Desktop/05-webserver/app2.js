 const http = require('http')

 //REQUIRE - Todo lo que el usuario Solicita
 //RESPONSE - Todo lo que el usuario responde
 http.createServer((req, res) => {
         res.writeHead(200, { 'Content-Type': 'application/json' })

         const persona = {
             id: 1,
             nombre: 'Angie'
         }

         res.write(JSON.stringify(persona));
         res.end();
     })
     .listen(8080)

 console.log('Escuchando el puerto', 8080);