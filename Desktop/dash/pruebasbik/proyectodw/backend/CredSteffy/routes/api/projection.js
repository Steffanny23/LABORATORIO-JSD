const express = require('express'); 

const ProjectionService = require('../../services/projection');
const validation = require('../../utils/middlewares/validationHandler');
const { processProjectionSchema } = require('../../utils/schemas/projection');


const router = express.Router();
const service = new ProjectionService();



	router.get('/', async function(req, res, next) {
		try {
			const { tags } = req.query;
			const projections = await service.getProjections({ tags });

			res.status(200).json({
				data: projections,
				message: 'projections listed'
			});
		} catch (err) {
			next(err);
		}
	});

	//validation(processProjectionSchema),
	router.post('/process',   async function(req, res, next) {
		try {
			const { body: dataProjection } = req;
			const result = await service.process({ dataProjection });

			res.status(201).json({
				data: result,
				message: 'vehiculo added'
			});
		} catch (err) {
			next(err);
		}
	});


	router.delete('/:projectionId', async function(req, res, next) {	
		try {
			const { projectionId } = req.params;
			const projection = await service.deleteProjectionById({ projectionId});

			res.status(200).json({
				data: projection,
				message: 'projection deleted'
			});
		} catch (err) {
			next(err);
		}
	});


module.exports = router;
