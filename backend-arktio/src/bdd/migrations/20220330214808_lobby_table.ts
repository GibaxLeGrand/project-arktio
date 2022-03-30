import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Opération de creation d'une table Lobby
	return knex.schema.createTable("Lobby", (table) =>
	{
		table.string("lobby_uuid").primary();
        table.string("lobby_name", 64).notNullable();
        table.string("lobby_password", 256).notNullable();

        table.string("users_list").references("user_uuid").inTable("Users").onDelete("SET NULL");
	});
}


export async function down(knex: Knex): Promise<void> {
    // Opération inverse d'une création de table
	return knex.schema.dropTableIfExists("Lobby");
}

