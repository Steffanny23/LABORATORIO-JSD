const Joi = require('joi');

const vehiculoIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
//const vehiculoTagSchema = Joi.array().items(Joi.string().max(10));

const processProjectionSchema = {
	basePrice: Joi.number().min(1).max(1000000).required(),
	interestRate: Joi.number().min(1).max(100).required(),
	fullName: Joi.string().max(100).required(),
	documentNumber: Joi.string().required(),
	email: Joi.string().max(100), //.required(),
	address: Joi.string().max(100).required(),
	quotes: Joi.number().min(1).max(100).required(),
};


module.exports = {
	processProjectionSchema
};
