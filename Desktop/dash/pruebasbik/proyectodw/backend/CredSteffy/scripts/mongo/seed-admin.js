/* ------ script que nos permite ingresar el admin en la base de datos   ------ */

const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');

//construye el usario admnistrador
function buildAdminUser(password) {
	return {
		password,
		username: config.authAdminUsername, //config -> .env
		email: config.authAdminEmail //config -> .env
	};
}
//Realizar una busqueda de nuestra collection users
async function hasAdminUser(mongoDB) {
	const adminUser = await mongoDB.getAll('users', {
		username: config.authAdminUsername //le pasamos el user desde .env
	});

	return adminUser && adminUser.length;
}
//crear un usuario hasheado
async function createAdminUser(mongoDB) {
	const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
	//llamar nuestro método create de mongodb
	const userId = await mongoDB.create('users', buildAdminUser(hashedPassword));
	return userId;
}

//function principal
async function seedAdmin() {
	try {
		//instancia de mongo
		const mongoDB = new MongoLib();
		//si mi base de datos ya tiene un usuario admin
		if (await hasAdminUser(mongoDB)) {
			console.log(chalk.yellow('Admin user already exists'));
			return process.exit(1);
		}
		//y si no existe lo crea
		const adminUserId = await createAdminUser(mongoDB);
		console.log(chalk.green('Admin user created with id:', adminUserId));
		return process.exit(0);
	} catch (error) {
		console.log(chalk.red(error));
		process.exit(1);
	}
}

seedAdmin();
