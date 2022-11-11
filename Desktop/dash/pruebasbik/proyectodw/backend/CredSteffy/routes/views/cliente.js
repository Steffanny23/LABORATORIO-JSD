const express = require('express');
const router = express.Router();
const ClienteService = require('../../services/cliente');
const { config } = require('../../config');
const cacheResponse = require('../../utils/cacheResponse');
//const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time');

service = new ClienteService();
router.get('/', async function(req, res, next) {
    try {
        //cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

        //obtenemos el tags
        const { tags } = req.query;

        const cliente = await service.getCliente({ tags });
        res.render('cliente', { cliente, dev: config.dev });
    } catch (err) {
        next(err);
    }
});

module.exports = router;