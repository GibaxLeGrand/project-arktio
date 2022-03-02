import type { Knex } from "knex";
import dotenv from "dotenv";

// Lecture des variables d'environnement dans un .env
dotenv.config();

const config: { [key: string]: Knex.Config } = {

	development: {
		client: 'mysql2',
		connection: {
			host : process.env.HOST_DEV,
			port : parseInt(process.env.PORT_DEV!),
			user : process.env.USER_DEV,
			password : process.env.PWD_DEV,
			database : process.env.DATABASE_DEV
		},
		migrations: {
		  tableName: 'migrations'
		}
	},

	production: {
		client: 'mysql',
		connection: {
			host : process.env.HOST_PROD,
			port : parseInt(process.env.PORT_PROD!),
			user : process.env.USER_PROD,
			password : process.env.PWD_PROD,
			database : process.env.DATABASE_PROD
		},
		migrations: {
		  tableName: 'migrations'
		}
	}

};

export default config;
