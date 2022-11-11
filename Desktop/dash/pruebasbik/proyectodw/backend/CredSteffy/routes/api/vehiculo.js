const express = require('express'); 

const VehiculoService = require('../../services/vehiculo');
const validation = require('../../utils/middlewares/validationHandler');
const { vehiculoIdSchema, vehiculoTagSchema, createVehiculoSchema, updateVehiculoSchema } = require('../../utils/schemas/vehiculo');


const router = express.Router();
const service = new VehiculoService();


	//definir rutas
	router.get('/', async function(req, res, next) {
		try {
			const { tags } = req.query;
			const vehiculos = await service.getVehiculos({ tags });

			res.status(200).json({
				data: vehiculos,
				message: 'vehiculos listed'
			});
		} catch (err) {
			next(err);
		}
	});


	router.get('/:vehiculoId', async function(req, res, next) {		
		try {
			const { vehiculoId } = req.params;
			const vehiculo = await service.getVehiculoById({ vehiculoId });

			res.status(200).json({
				data: vehiculo,
				message: 'vehiculo retrieved'
			});
		} catch (err) {
			next(err);
		}
	});


	router.post('/', validation(createVehiculoSchema), async function(req, res, next) {
		try {
			const { body: vehiculo } = req;
			const resultVehiculo = await service.createVehiculo({ vehiculo});

			res.status(201).json({
				data: resultVehiculo,
				message: 'vehiculo added'
			});
		} catch (err) {
			next(err);
		}
	});


	router.put('/:vehiculoId', validation({ vehiculoId: vehiculoIdSchema }, 'params'),
		validation(updateVehiculoSchema),
		async function(req, res, next) {
			try {
				const { vehiculoId } = req.params;
				const { body: vehiculo } = req;
				const resultVehiculo = await service.updateVehiculoById({ vehiculoId, vehiculo });

				res.status(200).json({
					data: resultVehiculo,
					message: 'vehiculo updated'
				});
			} catch (err) {
				next(err);
			}
		}
	);


	router.delete(
		'/:vehiculoId', async function(req, res, next) {	
			try {
				const { vehiculoId } = req.params;
				const vehiculo = await service.deleteVehiculoById({ vehiculoId });

				res.status(200).json({
					data: vehiculo,
					message: 'vehiculo deleted'
				});
			} catch (err) {
				next(err);
			}
		}
	);


module.exports = router;
