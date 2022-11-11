//gestionar usuarios admin
/* Verificas los datos que llega a la base de datos(user, password) si existe devuelvo el usuario y si no 
devuelvo un error que no esta autorizado*/

const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('boom');
const bcrypt = require('bcryptjs');
const MongoLib = require('../../../lib/mongo');

passport.use(
	//nos extrae el user y el password que le enviamos
	new BasicStrategy(async function(username, password, cb) {
		const mongoDB = new MongoLib(); //usae library MongoDB

		try {
			//obtener los usuarios
			const [ user ] = await mongoDB.getAll('users', { username });

			if (!user) {
				//si el usuario no existe le volvemos un error
				return cb(boom.unauthorized(), false);
			}
			//comparar el password que le enviamos con el password que esta en la base de datos
			if (!await bcrypt.compare(password, user.password)) {
				return cb(boom.unauthorized(), false); //y si  no es correcto devolver un mensaje que no esta autorizado
			}

			//y si el usuario existe entonces está autorizado
			return cb(null, user);
		} catch (error) {
			return cb(error);
		}
	})
);
