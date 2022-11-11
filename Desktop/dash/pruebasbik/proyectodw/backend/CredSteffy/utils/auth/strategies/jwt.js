//comprobar si el JSON Web Token está bien firmado y si puedo sacar la información de él

/* const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');
const { config } = require('../../../config');
const MongoLib = require('../../../lib/mongo');

passport.use(
	new Strategy(
		{
			//verifica nuestro llava secreta
			secretOrKey: config.authJwtSecret,
			//de donde sacamos el access-token
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		},
		async function(tokenPayload, cb) {
			//lbreria mongo
			const mongoDB = new MongoLib();

			try {
				//traer usuario
				const [ user ] = await mongoDB.getAll('users', {
					username: tokenPayload.sub
				});

				if (!user) {
					//y si el usuario no existe simplemente volvemos un error que el usuario no esta autorizado
					return cb(boom.unauthorized(), false);
				}

				//y si existe devolvemos el usuario
				return cb(null, user);
			} catch (error) {
				return cb(error);
			}
		}
	)
);
 */
