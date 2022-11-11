const Sentry = require('@sentry/node'); //sentry
const boom = require('boom');
const debug = require('debug')('app:error');
const { config } = require('../../config');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

//inicializar sentry
//Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

//function de error | boom
function withErrorStack(err, stack) {
	if (config.dev) {
		//si estamos en modo de desarrollo
		return { ...err, stack }; // Object.assign({}, err, stack)
	}
}

// Primer middleware para hacer log de los errores
function logErrors(err, req, res, next) {
	//Sentry.captureException(err); //sentry

	debug(err.stack);
	next(err);
}

//verifica el error | boom
function wrapErrors(err, req, res, next) {
	if (!err.isBoom) {
		//Si el error no esta rapeado
		next(boom.badImplementation(err)); //enviamos un error más general
	}

	next(err); //de lo contrario le pasamos el error
}

//middleware para el manejo de errores para el cliente
function clientErrorHandler(err, req, res, next) {
	const { output: { statusCode, payload } } = err; //boom

	//detecta si fue una llamada de un cliente  | catch errors for AJAX request or if an error ocurrs while streamming
	if (isRequestAjaxOrApi(req) || res.headersSent) {
		//devuelve un error en un json  -> X-Requested-With/XMLHttpRequest
		//if (req.xhr) {
		res.status(statusCode).json(withErrorStack(payload, err.stack));
		//res.status(500).json({ err: err.message });
	} else {
		next(err);
	}
}

//Middleware para manejar errores generales
function errorHandler(err, req, res, next) {
	const { output: { statusCode, payload } } = err; //boom
	//catch errors while streaming
	/* if (res.headersSent) {
		next(err);
	} */

	//vamos a preguntar si no es en modo desarrollo eliminamos el err.stack
	/* if (!config.dev) {
		delete err.stack;
	} */

	//si es en modo desarrollo lo vamos a responder
	res.status(statusCode);
	//res.status(err.status || 500);
	//imprimir una página de error
	res.render('error', withErrorStack(payload, err.stack));
	//res.render('error', { error: err });
}

module.exports = {
	logErrors,
	wrapErrors,
	clientErrorHandler,
	errorHandler
};
