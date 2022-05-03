import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Création d'une table "History"
    return knex.schema.createTable("History", (table) =>
    {
        table.increments("history_id").primary();
        table.timestamp("history_start").notNullable().defaultTo(knex.fn.now());
        table.timestamp("history_end").notNullable().defaultTo(knex.fn.now());
    })
    // Création d'une table "PlayerHistory"
    .createTable("PlayerHistory", (table) =>
    {
        table.increments("playerhistory_id").primary();
        table.integer("playerhistory_score").notNullable();
        // On ajoute une clé étrangère vers la table "Users" et "History"
        table.string("user_uuid").references("user_uuid").inTable("Users");
        table.integer("history_id").unsigned().references("history_id").inTable("History").onDelete("CASCADE");
    })
}

export async function down(knex: Knex): Promise<void> {
    // On supprime la table "History" et "PlayerHistory"
    return knex.schema
        .dropTableIfExists("PlayerHistory")
        .dropTableIfExists("History");
}