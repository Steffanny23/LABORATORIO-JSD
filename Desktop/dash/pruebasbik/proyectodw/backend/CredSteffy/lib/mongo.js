//configuración de conexion a la base de datos en mongo
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:mongo');
const { config } = require('.././config');

//caracteres especiales
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//ConnectionString
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
	constructor() {
		this.client = new MongoClient(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		this.dbName = DB_NAME;
	}

	//conexion
	connect() {
		return new Promise((resolve, reject) => {
			this.client.connect((error) => {
				if (error) {
					reject(error); //si hay un error rechazar nuestra promesa con un error
				}
				debug('Connected succesfully to mongo');
				resolve(this.client.db(this.dbName)); //Si todo esta bien conectamos el cliente con la base de datos
			});
		});
	} 


	getAll(collection, query) {
		return this.connect().then((db) => {
			return db.collection(collection).find(query).toArray();
		});
	}

	get(collection, id) {
		return this.connect().then((db) => {
			return db.collection(collection).findOne({ _id: ObjectId(id) });
		});
	}

	create(collection, data) {
		return this.connect()
			.then((db) => {
				return db.collection(collection).insertOne(data);
			})
			.then((result) => result.insertedId);
	}

	update(collection, id, data) {
		return this.connect()
			.then((db) => {
				return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
			})
			.then((result) => result.insertedId || id);
	}

	delete(collection, id) {
		return this.connect()
			.then((db) => {
				return db.collection(collection).deleteOne({ _id: ObjectId(id) });
			})
			.then(() => id);
	}

} 

module.exports = MongoLib;
