const express = require('express');
//const passport = require('passport');
//const { checkRole } = require('../utils/middlewares/auth.handler');


const vehiculoRouter = require('./api/vehiculo');
const authRouter = require('./api/auth');
const projectionRouter = require('./api/projection');
const clienteRouter = require('./api/cliente');
const usuarioRouter = require('./api/usuario');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/vehiculos', vehiculoRouter);
    router.use('/auth', authRouter);
    router.use('/projection', projectionRouter);
    router.use('/clients', clienteRouter);
    router.use('/usuarios', usuarioRouter);
}

module.exports = routerApi;