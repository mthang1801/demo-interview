import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
	master: {
		connection: process.env.DATABASE_CONNECTION || 'mysql',
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		name: process.env.DATABASE_NAME
	},
	slaves: [
		{
			connection: process.env.DATABASE_CONNECTION || 'mysql',
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			name: process.env.DATABASE_NAME
		}
	]
}));
