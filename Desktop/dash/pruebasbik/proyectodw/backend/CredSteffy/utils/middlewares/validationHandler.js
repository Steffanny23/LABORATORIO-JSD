/* -----------------------------------------------------------------------------------------------------
   VALIDAR NUESTRO DATOS, EVITAR QUE NOS ENVIEN DATOS QUE NO CORRESPONDE AL ESQUEMA QUE TENEMOS 
  ------------------------------------------------------------------------------------------------------- */
const Joi = require('joi');
const boom = require('boom');

function validate(data, schema) {
	const { error } = Joi.validate(data, schema);
	return error;
}

//implementando función de tipo closure
function validationHandler(schema, check = 'body') {
	//funcion middleware
	return function(req, res, next) {
		const error = validate(req[check], schema);
		error ? next(boom.badRequest(error)) : next();
		//error ? next(new Error(error)) : next();
	};
}

module.exports = validationHandler;
