import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Suppression de toute la table utilisateur
	await knex('Users').del()
	// Insertion des données dans la table utilisateur
    await knex('Users').insert([
		{user_name: 'toto', user_email: 'toto@gmail.com', user_password: 'toto'},
		{user_name: 'tata', user_email: 'tata@hotmail.com', user_password: 'tata'},
		{user_name: 'foo', user_email: 'a@xyz.com', user_password: 'foo'},
		{user_name: 'bar', user_email: 'b@hotmail.com', user_password: 'bar'},
		{user_name: 'tar', user_email: 'c@gmail.com', user_password: 'chopatate'},
	]);
};
