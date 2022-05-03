import { Knex } from "knex";

// Insertion d'un utilisateur de la table Lobby
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Users").update({ user_current_lobby: null });
    await knex("Lobby").del();

    // Inserts seed entries
    await knex("Lobby").insert([
        {
            lobby_uuid: "1",
            lobby_password: "toto",
            lobby_host: "1",
            lobby_users: "1"
        }
    ]);

    await knex("Users").update({
        user_current_lobby: "1"
    }).where({
        user_uuid: "1"
    });

    await knex("Lobby").insert([
        {
            lobby_uuid: "1",
            lobby_password: "toto",
            lobby_host: "1",
            lobby_users: "2"
        }
    ]);

    await knex("Users").update({
        user_current_lobby: "1"
    }).where({
        user_uuid: "2"
    });
};
