//filtrar los productos  | para nuestros test usamos datos estaticos no datos desde la base de datos
const { productsMock, filteredProductsMock } = require('./products');
const sinon = require('sinon'); //nos permite hacer mock stop

//crea una función que no hace nada
const getAllStub = sinon.stub();
//cuando se llama y cuando no
const tagQuery = { tags: { $in: [ 'expensive' ] } };

getAllStub.withArgs('products').resolves(productsMock);
getAllStub.withArgs('products', tagQuery).resolves(filteredProductsMock('expensive'));

//crear el stub   | le paso el id del producto
const createStub = sinon.stub().resolves('6bedb1267d1ca7f3053e2875');

//mockear
class MongoLibMock {
	getAll(collection, query) {
		return getAllStub(collection, query);
	}

	create(collection, data) {
		return createStub(collection, data);
	}
}

module.exports = {
	getAllStub,
	createStub,
	MongoLibMock
};
