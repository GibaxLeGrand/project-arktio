import Knex, { knex } from "knex";
import { Model } from "objection";
import config from "./knexfile"

// Fonction qui permet de se connecter à la BDD.
export async function db_connect(mode: string) {
    // On va créer une instance de knex et bind à objection.
    const knex_instance = Knex(config[mode]);
    Model.knex(knex_instance);
    // Faire une query simple pour tester si on est connectée à la BDD.
    try {
        const status = await knex_instance
            .raw("select 'OK' as Status")
            .timeout(1000, {cancel: true});
        
        return status[0];
    
    } catch (error) {
        console.log(error);

        return [{ Status: "ERROR" }];
    }
}

// Fonction qui permet de se déconnecter à la BDD.
export async function db_disconnect() {
    // On récupère l'instance knex et on destroy la connexion.
    const knex_instance = Model.knex();
    await knex_instance.destroy();
}