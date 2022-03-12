/*
	Fichier de migration knex :

	Semblable à un "commit" dans git, cela permet de faire
	des modifications dans la base de données, surtout pour
	l'ajout/modification ou la suppression des tables dans la BDD.

	On met dans exports.up tout les changements qu'on souhaite faire
	et dans exports.down, les opérations inverses pour remettre
	la BDD dans son état initial.

	/!\ : On utilise la syntaxe d'un autre ORM : knex.js, c'est pas objection !
*/

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Opération de creation d'une table utilisateur
	return knex.schema.createTable("Users", (table) =>
	{
		table.increments("user_id").primary();
		table.string("user_name", 64).notNullable();
		table.string("user_email", 256).unique().notNullable();
		table.string("user_password", 256).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	// Opération inverse d'une création de table
	return knex.schema.dropTableIfExists("Users");
}

