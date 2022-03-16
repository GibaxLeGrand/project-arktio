import {
	ValidationError,
	NotFoundError,
	DBError,
	ConstraintViolationError,
	UniqueViolationError,
	NotNullViolationError,
	ForeignKeyViolationError,
	CheckViolationError,
	DataError
} from "objection";

// Classe permettant de throw une erreur custom
export class CustomError extends Error {
	
	statusCode: number;
	message: string;
	type: string;
	data: {};

	constructor(statusCode: number, message: string, type="Error", data = {}) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.type = type;
		this.data = data;
		this.name = this.constructor.name;
	}
}

// Fonction qui gére les erreurs provenant de l'insertion/BDD
export function errorHandler(err: any, res: any) {
	// Erreur venant de la définition du schéma de validation
	if (err instanceof ValidationError) {
		switch (err.type) {
			case 'ModelValidation':
				res.status(400).send({
					message: err.message,
					type: err.type,
					data: err.data
				});
				break;
			case 'RelationExpression':
				res.status(400).send({
					message: err.message,
					type: 'RelationExpression',
					data: {}
				});
				break;
			case 'UnallowedRelation':
				res.status(400).send({
					message: err.message,
					type: err.type,
					data: {}
				});
				break;
			case 'InvalidGraph':
				res.status(400).send({
					message: err.message,
					type: err.type,
					data: {}
				});
				break;
			default:
				res.status(400).send({
					message: err.message,
					type: 'UnknownValidationError',
					data: {}
				});
				break;
		}
	} 
	// Erreur où la query est vide
	else if (err instanceof NotFoundError) {
		res.status(404).send({
			message: err.message,
			type: 'NotFound',
			data: {}
		});
	} 
	// Erreur où l'insertion est invalide à cause de la contrainte unique
	else if (err instanceof UniqueViolationError) {
		res.status(409).send({
			message: err.message,
			type: 'UniqueViolation',
			data: {
				columns: err.columns,
				table: err.table,
				constraint: err.constraint
			}
		});
	} 
	// Erreur où l'insertion est invalide à cause de la contrainte not null
	else if (err instanceof NotNullViolationError) {
		res.status(400).send({
			message: err.message,
			type: 'NotNullViolation',
			data: {
				column: err.column,
				table: err.table
			}
		});
	} 
	// Erreur où l'insertion est invalide à cause de la contrainte d'une clé étrangère
	else if (err instanceof ForeignKeyViolationError) {
		res.status(409).send({
			message: err.message,
			type: 'ForeignKeyViolation',
			data: {
				table: err.table,
				constraint: err.constraint
			}
		});
	} 
	// Erreur où l'insertion n'est pas conforme au modèle de validation
	else if (err instanceof CheckViolationError) {
		res.status(400).send({
			message: err.message,
			type: 'CheckViolation',
			data: {
				table: err.table,
				constraint: err.constraint
			}
		});
	} 
	// Erreur où l'insertion utilise des types différent du modèle de validation
	else if (err instanceof DataError) {
		res.status(400).send({
			message: err.message,
			type: 'InvalidData',
			data: {}
		});
	} 
	// Erreur inconnue provenant de la BDD
	else if (err instanceof DBError) {
		res.status(500).send({
			message: err.message,
			type: 'UnknownDatabaseError',
			data: {}
		});
	} 
	// Erreur inconnue
	else {
		res.status(500).send({
			message: err.message,
			type: 'UnknownError',
			data: {}
		});
	}
}