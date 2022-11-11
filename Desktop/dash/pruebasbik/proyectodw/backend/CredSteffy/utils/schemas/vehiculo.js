const Joi = require('joi');

const vehiculoIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const vehiculoTagSchema = Joi.array().items(Joi.string().max(10));

const createVehiculoSchema = {
    nombre: Joi.string().max(50).required(),
    precio: Joi.number().min(1).max(1000000).required(),
    descripcion: Joi.string().max(50),
    imagen: Joi.string().required(),
    //tags: vehiculoTagSchema
};

const updateVehiculoSchema = {
    nombre: Joi.string().max(50),
    precio: Joi.number().min(1).max(1000000),
    descripcion: Joi.string().max(150),
    imagen: Joi.string(),
    //tags: vehiculoTagSchema
};

module.exports = {
    vehiculoIdSchema,
    vehiculoTagSchema,
    createVehiculoSchema,
    updateVehiculoSchema
};