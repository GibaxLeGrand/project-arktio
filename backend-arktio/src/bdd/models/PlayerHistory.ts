import { Model } from "objection";

// Création d'une classe PlayerHistory
export class PlayerHistory extends Model {
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    playerhistory_id!: number;
    playerhistory_score!: number;

    // On ajoute une clé étrangère vers la table "Users" et "History"
    user_uuid!: string;
    history_id!: number;

    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "PlayerHistory";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "playerhistory_id";
    }

    // D'autres options oeuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.

    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static override get jsonSchema() {
        return {
            type: "object",
            required: ["playerhistory_score", "user_uuid", "history_id"],
            properties: {
                playerhistory_id: { type: 'number' },
                playerhistory_score: { type: 'number' },
                user_uuid: { type: 'string' },
                history_id: { type: 'number' }
            }
        }
    }
}