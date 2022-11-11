const express = require('express'); 

const VehiculoUsuario = require('../../services/usuario');
const validation = require('../../utils/middlewares/validationHandler');
const { usuarioIdSchema, usuarioTagSchema, createUsuarioSchema, updateUsuarioSchema } = require('../../utils/schemas/usuario');


const router = express.Router();
const service = new VehiculoUsuario();


	//definir rutas
	router.get('/', async function(req, res, next) {
		try {
			const { tags } = req.query;
			const usuarios = await service.getUsuarios({ tags });

			res.status(200).json({
				data: usuarios,
				message: 'usuarios listed'
			});
		} catch (err) {
			next(err);
		}
	});


	router.get('/:usuarioId', async function(req, res, next) {		
		try {
			const { usuarioId } = req.params;
			const usuario = await service.getUsuarioById({ usuarioId });

			res.status(200).json({
				data: usuario,
				message: 'usuario retrieved'
			});
		} catch (err) {
			next(err);
		}
	});


	router.post('/', validation(createUsuarioSchema), async function(req, res, next) {
		try {
			const { body: usuario } = req;
			const resultUsuario = await service.createUsuario({ usuario });

			res.status(201).json({
				data: resultUsuario,
				message: 'usuario added'
			});
		} catch (err) {
			next(err);
		}
	});


	router.put('/:usuarioId', validation({ usuarioId: usuarioIdSchema }, 'params'),
		validation(updateUsuarioSchema),
		async function(req, res, next) {
			try {
				const { usuarioId } = req.params;
				const { body: usuario } = req;
				const resultUsuario = await service.updateUsuarioById({ usuarioId, usuario });

				res.status(200).json({
					data: resultUsuario,
					message: 'usuario updated'
				});
			} catch (err) {
				next(err);
			}
		}
	);


	router.delete(
		'/:usuarioId', async function(req, res, next) {	
			try {
				const { usuarioId } = req.params;
				const usuario = await service.deleteUsuarioById({ usuarioId });

				res.status(200).json({
					data: usuario,
					message: 'usuario deleted'
				});
			} catch (err) {
				next(err);
			}
		}
	);


module.exports = router;
