import { Knex } from "knex";
import { Model } from "objection";

// Fonction qui permet de se déconnecter à la BDD.
export async function disconnect(): Promise<void> {
    // On récupère l'instance knex et on destroy la connexion.
    const knex_instance: Knex<any, Record<string, any>[]> = Model.knex();
    await knex_instance.destroy();
}