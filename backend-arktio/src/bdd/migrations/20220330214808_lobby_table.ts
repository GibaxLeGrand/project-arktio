import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Opération de creation d'une table Lobby
	return knex.schema.createTable("Lobby", (table) =>
	{
		table.increments("lobby_uuid").primary();
        table.string("lobby_name", 64).notNullable();
        table.string("lobby_password", 255);

        table.foreign("user_id").references("user_id").inTable("Users").onDelete("CASCADE");
	});
}


export async function down(knex: Knex): Promise<void> {
    // Opération inverse d'une création de table
	return knex.schema.dropTableIfExists("Lobby");
}

