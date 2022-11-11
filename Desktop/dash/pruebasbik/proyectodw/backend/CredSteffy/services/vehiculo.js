const MongoLib = require('../lib/mongo');

class VehiculoService {
    constructor() {
        this.collection = 'vehiculos';
        this.mongoDB = new MongoLib();
    }


    async getVehiculos({ tags }) {
        //si hay un tags entonces crear el query
        const query = tags && { tags: { $in: tags } };
        const vehiculos = await this.mongoDB.getAll(this.collection, query);
        return vehiculos || [];
    }

    async getVehiculoById({ vehiculoId }) {
        const vehiculo = await this.mongoDB.get(this.collection, vehiculoId);
        return vehiculo || {};
    }

    async createVehiculo({ vehiculo }) {
        const createdVehiculoId = await this.mongoDB.create(this.collection, vehiculo);
        return createdVehiculoId;
    }

    async updateVehiculoById({ vehiculoId, vehiculo }) {
        const updateVehiculoId = await this.mongoDB.update(this.collection, vehiculoId, vehiculo);
        return updateVehiculoId;
    }

    async deleteVehiculoById({ vehiculoId }) {
        const deleteVehiculoId = await this.mongoDB.delete(this.collection, vehiculoId);
        return deleteVehiculoId;
    }

}

module.exports = VehiculoService;