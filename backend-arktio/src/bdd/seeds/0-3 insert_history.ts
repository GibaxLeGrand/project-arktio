import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("PlayerHistory").del();
    await knex("History").del();

    // Inserts seed entries
    await knex("History").insert([
        {
            history_start: new Date(),
            history_end: new Date(),
        },
    ]);

    // Get the last history
    const history = await knex("History").select("*").orderBy("history_id", "desc").first();

    await knex("PlayerHistory").insert([
        {
            playerhistory_score: 30,
            user_uuid: "1",
            history_id: history.history_id
        },
        {
            playerhistory_score: 20,
            user_uuid: "2",
            history_id: history.history_id
        },
        {
            playerhistory_score: 10,
            user_uuid: "3",
            history_id: history.history_id
        }
    ]);
};
