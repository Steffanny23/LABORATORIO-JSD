const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class AuthService {
    constructor() {
        this.collection = 'usuario';
        this.mongoDB = new MongoLib();
    }


    async login({ user }) {
        try{
            let password = user.password;
            const query = { email: user.email };
        
            const usuarios = await this.mongoDB.getAll(this.collection, query);

            if(usuarios.length > 0){     
                const match = await bcrypt.compare(password, usuarios[0].password);
                if(match) {
                    let newData = {
                        _id: "636db4ae5f8f582104f4a13e",
                        nombre: usuarios[0].nombre,
                        email: usuarios[0].email,
                        rol: usuarios[0].rol
                    }

                    return newData;
                }else{
                    return { status: "01" };
                }        
            }else{
                return { status: "01"};
            }
        }catch(ex){
            throw ex;
        }  
    }

    //{ tags: ["red", "blank"] }

    /* async getClienteById({ clienteId }) {
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
    } */

}

module.exports = AuthService;