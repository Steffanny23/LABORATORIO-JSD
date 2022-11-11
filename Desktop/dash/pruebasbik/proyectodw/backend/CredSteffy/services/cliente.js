const MongoLib = require('../lib/mongo');

class ClienteService {
    constructor() {
        this.collection = 'cliente';
        this.mongoDB = new MongoLib();
    }


    async getCliente({ tags }) {
        //si hay un tags entonces crear el query
        const query = tags && { tags: { $in: tags } };
        const cliente = await this.mongoDB.getAll(this.collection, query);
        return cliente || [];
    }

    async getClienteById({ clienteId }) {
        const cliente = await this.mongoDB.get(this.collection, clienteId);
        return cliente || {};
    }

    async createCliente({ cliente }) {
        const createdClienteId = await this.mongoDB.create(this.collection, cliente);
        return createdClienteId;
    }

    async updateClienteById({ clienteId, cliente }) {
        const updateClienteId = await this.mongoDB.update(this.collection, clienteId, cliente);
        return updateClienteId;
    }

    async deleteClienteById({ clienteId }) {
        const deleteClienteId = await this.mongoDB.delete(this.collection, clienteId);
        return deleteClienteId;
    }

}

module.exports = ClienteService;