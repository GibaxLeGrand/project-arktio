import { Knex } from "knex";

// Insertion d'un utilisateur de la table Users
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("History").del();
    await knex("PlayerHistory").del();
    await knex("Users").del();

    // Inserts seed entries
    await knex("Users").insert([
        {
            user_uuid: "1",
            user_name: "toto",
            user_email: "toto@gmail.com",
            user_password: "toto",
            user_current_lobby: null,
        },
        {
            user_uuid: "2",
            user_name: "titi",
            user_email: "titi@gmail.com",
            user_password: "titi",
            user_current_lobby: null,
        },
        {
            user_uuid: "3",
            user_name: "tata",
            user_email: "tata@gmail.com",
            user_password: "tata",
            user_current_lobby: null,
        },
    ]);
};
