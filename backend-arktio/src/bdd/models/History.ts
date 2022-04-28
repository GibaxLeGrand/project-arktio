import { Model } from "objection";

// Création d'une classe History
export class History extends Model {
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    history_id!: number;
    history_start!: Date;
    history_end!: Date;

    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "History";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "history_id";
    }

    // D'autres options oeuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.

    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static override get jsonSchema() {
        return {
            type: "object",
            required: ["history_id"],
            properties: {
                history_id: { type: 'number' },
            }
        }
    }
}