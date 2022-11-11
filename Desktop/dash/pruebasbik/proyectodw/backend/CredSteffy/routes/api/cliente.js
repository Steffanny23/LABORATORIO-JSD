const express = require('express');

const ClienteService = require('../../services/cliente');
const validation = require('../../utils/middlewares/validationHandler');
const { clienteIdSchema, clienteTagSchema, createClienteSchema, updateClienteSchema } = require('../../utils/schemas/cliente');


const router = express.Router();
const service = new ClienteService();


//definir rutas
router.get('/', async function(req, res, next) {
    try {
        const { tags } = req.query;
        const cliente = await service.getCliente({ tags });

        res.status(200).json({
            data: cliente,
            message: 'cliente listed'
        });
    } catch (err) {
        next(err);
    }
});


router.get('/:clienteId', async function(req, res, next) {
    try {
        const { clienteId } = req.params;
        const cliente = await service.getClienteById({ clienteId });

        res.status(200).json({
            data: cliente,
            message: 'cliente retrieved'
        });
    } catch (err) {
        next(err);
    }
});


router.post('/', validation(createClienteSchema), async function(req, res, next) {
    try {
        const { body: cliente } = req;
        const resultCliente = await service.createCliente({ cliente });

        res.status(201).json({
            data: resultCliente,
            message: 'cliente added'
        });
    } catch (err) {
        next(err);
    }
});


router.put('/:clienteId', validation({ clienteId: clienteIdSchema }, 'params'),
    validation(updateClienteSchema),
    async function(req, res, next) {
        try {
            const { clienteId } = req.params;
            const { body: cliente } = req;
            const resultCliente = await service.updateClienteById({ clienteId, cliente });

            res.status(200).json({
                data: resultCliente,
                message: 'cliente updated'
            });
        } catch (err) {
            next(err);
        }
    }
);


router.delete(
    '/:clienteId', async function(req, res, next) {
        try {
            const { clienteId } = req.params;
            const cliente = await service.deleteClienteById({ clienteId });

            res.status(200).json({
                data: cliente,
                message: 'cliente deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);


module.exports = router;