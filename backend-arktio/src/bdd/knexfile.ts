import { Knex } from "knex";
import dotenv from "dotenv";

// Lecture des variables d'environnement dans un .env

let envpath : string | undefined;
if(process.env.npm_lifecycle_script && process.env.npm_lifecycle_script!.includes("knex")) {
	envpath = "../../.env"
}

dotenv.config({ 
	path: envpath,
	encoding: 'latin1', 
	debug: true, 
	override: false 
});

// Configuration de la connexion à la BDD
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
		debug: false,
		migrations: {
			tableName: 'migrations'
		}
	},

	testing: {
		client: 'mysql2',
		connection: {
			host : process.env.HOST_TEST,
			port : parseInt(process.env.PORT_TEST!),
			user : process.env.USER_TEST,
			password : process.env.PWD_TEST,
			database : process.env.DATABASE_TEST
		},
		debug: true,
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
		debug: false,
		migrations: {
			tableName: 'migrations'
		}
	}

};

export default config;
