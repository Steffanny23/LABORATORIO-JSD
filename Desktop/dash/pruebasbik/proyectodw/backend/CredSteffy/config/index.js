require('dotenv').config();

const config = {
	//verifica si NODE_ENV es diferente de producción
	dev: process.env.NODE_ENV !== 'production',
	//resto de las variables
	port: process.env.PORT,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbName: process.env.DB_NAME,

	sentryDns: process.env.SENTRY_DNS,
	sentryId: process.env.SENTRY_ID,

	authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
	authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
	authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
	authJwtSecret: process.env.AUTH_JWT_SECRET
};

module.exports = { config };
