/* -------- Endpoint para obtener el token(JWT)  ---------*/

const express = require('express');
const passport = require('passport');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const api = express.Router();

const { config } = require('../../config');
const AuthService = require('../../services/auth');
const validation = require('../../utils/middlewares/validationHandler');
const service = new AuthService();


// Basic strategy
require('../../utils/auth/strategies/basic');

api.post('/token', async function(req, res, next) {
	//strategy of basic ya hemos implementado
	passport.authenticate('basic', function(error, user) {
		//usando custom callback
		try {
			//verificar si el  usuario no existe
			if (error || !user) {
				next(boom.unauthorized()); //enviar no autorizado
			}
			//parte importante | no quiero que haya una sesion
			req.login(user, { session: false }, async function(error) {
				if (error) {
					next(error);
				}
				//creando payload de mi json web token
				const payload = { sub: user.username, email: user.email };
				//"firmo el json web token" usuando la librería "jsonwebtoken"
				const token = ""; //temporal by
				/* const token = jwt.sign(payload, config.authJwtSecret, {
					expiresIn: '15m' //que expire en 15 minutos | darle el tiempo más corto posibloe maximmo 15 minutes
				}); */

				//parte más importante | si todo sale bien le devolvemos un 200 y el access_token
				return res.status(200).json({ access_token: token });
			});
		} catch (error) {
			next(error); //y si sale mal le volvemos un error
		}
	})(req, res, next);
});


//validation(createClienteSchema),
api.post('/login', async function(req, res, next) {
    try {
        const { body: user} = req;

		const resultCliente = await service.login({ user });

		if(resultCliente.status == "01"){
			res.status(201).json({
				data: {},
				message: "Login Fallido",
				status: "01"
			});
		}else{
			res.status(201).json({
				data: resultCliente,
				message: 'Exitoso',
				status: "00"
			});
		}
        
    } catch (err) {
        next(err);
    }
});

module.exports = api;
