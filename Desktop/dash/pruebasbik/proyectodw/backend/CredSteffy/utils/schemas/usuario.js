const Joi = require('joi');

const usuarioIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const usuarioTagSchema = Joi.array().items(Joi.string().max(10));

const createUsuarioSchema = {
    nombre: Joi.string().max(50).required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
    rol:Joi.string().max(20).required(),
    //tags: vehiculoTagSchema
};

const updateUsuarioSchema = {
    nombre: Joi.string().max(50),
    email: Joi.string().max(50),
    password: Joi.string().max(50),
    rol:Joi.string().max(20),
    //tags: vehiculoTagSchema
};

module.exports = {
    usuarioIdSchema,
    usuarioTagSchema,
    createUsuarioSchema,
    updateUsuarioSchema
};