const Joi = require('joi');

const clienteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const clienteTagSchema = Joi.array().items(Joi.string().max(10));

const createClienteSchema = {
    nombre: Joi.string().max(50).required(),
    Apellido: Joi.string().max(50).required(),
    Dpi: Joi.number().min(1).max(1000000),
    celular: Joi.number().min(1).max(1000000),
    direccion: Joi.string().max(50).required(),
    //tags: vehiculoTagSchema
};

const updateClienteSchema = {
    nombre: Joi.string().max(50),
    Apellido: Joi.string().max(50),
    Dpi: Joi.number().min(1).max(1000000),
    celular: Joi.number().min(1).max(1000000),
    direccion: Joi.string().max(50),

    //tags: vehiculoTagSchema
};

module.exports = {
    clienteIdSchema,
    clienteTagSchema,
    createClienteSchema,
    updateClienteSchema
};