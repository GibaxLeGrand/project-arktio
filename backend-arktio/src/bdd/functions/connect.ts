import knex, { Knex } from "knex";
import { Model } from "objection";
import config from "../knexfile"

// Fonction qui permet de se connecter à la BDD.
export async function connect(mode: string): Promise<any> {
    // On va créer une instance de knex et bind à objection.
    const knex_instance: Knex<any, Record<string, any>[]> = knex(config[mode]);
    Model.knex(knex_instance);
    // Faire une query simple pour tester si on est connectée à la BDD.
    try {
        const status: any = await knex_instance
            .raw("select 'OK' as Status")
            .timeout(1000, {cancel: true});
        
        return status[0];
    } catch (error) {
        console.log(error);

        return [{ Status: "ERROR" }];
    }
}