import Knex from "knex";
import { Model } from "objection";
import config from "./knexfile"

// Fonction qui permet de se connecter à la BDD.
async function db_connect(mode: string) {
    // On va créer une instance de knex et bind à objection.
    const knex_instance = Knex(config[mode]);
    Model.knex(knex_instance);
}

export default db_connect;