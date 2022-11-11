const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsuarioService {
    constructor() {
        this.collection = 'usuario';
        this.mongoDB = new MongoLib();
    }


    async getUsuarios({ tags }) {
        //si hay un tags entonces crear el query
        const query = tags && { tags: { $in: tags } };
        const usuarios = await this.mongoDB.getAll(this.collection, query);
        return usuarios || [];
    }

    async getUsuarioById({ usuarioId }) {
        const usuario = await this.mongoDB.get(this.collection, usuarioId);
        return usuario || {};
    }

    async createUsuario({ usuario }) {

        const saltRounds = 10;
        //const hash = bcrypt.hashSync(usuario.password, salt);
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(usuario.password, salt);
        usuario.password = hash;

        const createdUsuarioId = await this.mongoDB.create(this.collection, usuario);
        return createdUsuarioId;
    }

    async updateUsuarioById({ usuarioId, usuario }) {
        const updateUsuarioId = await this.mongoDB.update(this.collection, usuarioId, usuario);
        return updateUsuarioId;
    }

    async deleteUsuarioById({ usuarioId }) {
        const deleteUsuarioId = await this.mongoDB.delete(this.collection, usuarioId);
        return deleteUsuarioId;
    }

}

module.exports = UsuarioService;