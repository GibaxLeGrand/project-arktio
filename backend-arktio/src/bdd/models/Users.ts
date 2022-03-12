import { Model } from "objection";

export class Users extends Model {
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    user_id!: number;
    user_name!: string;
    user_email!: string;
    user_password!: string;

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
    
    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_name", "user_email", "user_password"],
            properties: {
                user_id: { type: 'number' },
                user_name: { type: 'string', minLength: 3, maxLength: 256 },
                user_email: { type: 'string', minLength: 1, maxLength: 256 },
                user_password: { type: 'string', minLength: 7, maxLength: 256 },
            }
        }
    }
}
