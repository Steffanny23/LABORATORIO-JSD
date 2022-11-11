const express = require('express');
const router = express.Router();
const VehiculoService = require('../../services/vehiculo');
const { config } = require('../../config');
const cacheResponse = require('../../utils/cacheResponse');
//const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time');

service = new VehiculoService();
router.get('/', async function(req, res, next) {
	try {
		//cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

		//obtenemos el tags
		const { tags } = req.query;

		const vehiculos = await service.getVehiculos({ tags });
		res.render('vehiculos', { vehiculos, dev: config.dev });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
