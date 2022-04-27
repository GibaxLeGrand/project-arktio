import { Model } from "objection";
import { Lobby } from "./Lobby";

export class Users extends Model {
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    user_uuid!: string;
    user_name!: string;
    user_email!: string;
    user_password!: string;
    
    // lobby_id?: Lobby;

    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "Users";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "user_uuid";
    }
    
    // D'autres options oeuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.
    
    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_name", "user_email", "user_password"],
            properties: {
                user_uuid: { type: 'string' },
                user_name: { type: 'string', minLength: 3, maxLength: 256 },
                user_email: { type: 'string', minLength: 1, maxLength: 256 },
                user_password: { type: 'string', minLength: 7, maxLength: 256 },
            }
        }
    }

    // Attribut permettant de donner les relations entre les tables.
    static relationMappings = {
        current_users: {
            relation: Model.HasOneRelation, // relation 0-1 (peut pas rejoindre plusieurs lobbys)
            modelClass: Users,
            join: {
                from: 'Users.lobby_uuid',
                to: 'Lobby.current_users'
            }
        }       
    }
}
