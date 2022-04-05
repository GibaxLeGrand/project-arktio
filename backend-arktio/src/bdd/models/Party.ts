import { Model } from "objection";

export class Party extends Model {
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    party_id!: number;
    user_uuid!: number;

    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "Party";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "party_id";
    }
    
    // D'autres options peuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.
    
    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["party_id", "user_id"],
            properties: {
                party_id: { type: 'number' },
                user_id: { type: 'number' },
            }
        }
    }
}