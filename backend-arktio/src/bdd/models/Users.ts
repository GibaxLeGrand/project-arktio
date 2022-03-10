import { Model } from "objection";

export class Users extends Model {
    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "Users";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "user_id";
    }
    // D'autres options oeuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.
}
