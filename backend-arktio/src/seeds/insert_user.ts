import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Suppression de toute la table utilisateur
	await knex('Users').del()
	// Insertion des données dans la table utilisateur
    await knex('Users').insert([
		{user_name: 'toto'},
		{user_name: 'tata'},
		{user_name: 'foo'},
		{user_name: 'bar'},
		{user_name: 'tar'},
	]);
};
