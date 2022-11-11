const express = require('express');
const cors = require('cors')
const path = require('path');
//require('dotenv').config();
const bodyParser = require('body-parser');
const boom = require('boom');
const debug = require('debug')('app:server');
const helmet = require('helmet');

const routerApi = require('./routes');
//const productsRouter = require('./routes/views/products'); //View pruebas
const vehiculoRouter = require('./routes/views/vehiculo'); //View


const { logErrors, clientErrorHandler, errorHandler, wrapErrors } = require('./utils/middlewares/errorsHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
//inicializar app
const app = express();
app.use(cors())

//middlewares
app.use(helmet());
app.use(bodyParser.json());

//cual van a hacer nuestros archivos estaticos
app.use('/static', express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Views
//app.use('/products', productsRouter);
app.use('/vehiculos', vehiculoRouter);

//app.use('/products', productsRouter);

//API
routerApi(app);

//redirect
app.get('/', function(req, res) {
    res.redirect('/vehiculos');
});


//cualquer pagina o ruta no definida lo redirecionara a 404.pug
app.use(function(req, res, next) {
    //validar a cual se le muestra el error y que tipo de error se le muestra a una API o un FRONTEND
    if (isRequestAjaxOrApi(req)) {
        const { output: { statusCode, payload } } = boom.notFound();
        res.status(statusCode).json(payload);
    }
    res.status(404).render('404');
});

//Los middleware de errores simpre deben ir al final de todas la rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//inicializar server
const port = 8000;
const server = app.listen(port, function() {
    //mediante un callback, imprimir que el servidor esta conectado
    debug(`Listen http://localhost:${port}`);
});