import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    // Création d'une table "Lobby"
    .createTable("Lobby", (table) =>
    {
        table.increments("lobby_id").primary();
        table.string("lobby_uuid").notNullable();
        table.string("lobby_password", 64).nullable();

        table.string("lobby_host").notNullable().references("user_uuid").inTable("Users").onDelete("CASCADE");
        table.string("lobby_users").notNullable().references("user_uuid").inTable("Users").onDelete("CASCADE");
    })
    // On modifie la table User pour ajouter un champ "current_lobby"
    .alterTable("Users", (table) =>
    {
        table.string("user_current_lobby").nullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    // On supprime la table "Lobby"
    return knex.schema
        // On supprime le champ "current_lobby" de la table User
        .alterTable("Users", (table) =>
        {
            table.dropColumn("user_current_lobby");
        })
        .dropTableIfExists("Lobby")
}

