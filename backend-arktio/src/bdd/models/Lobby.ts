import { Model } from "objection";
import { Users } from "./Users";

export class Lobby extends Model{
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    lobby_uuid!: string;
    lobby_name!: string;
    lobby_password!: string;

    current_users?: Users[];

    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "Lobby";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "lobby_id";
    }

    // D'autres options oeuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.
    
    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static get jsonSchema() {
        return {
            type: "object",
            required : ["lobby_id", "lobby_name", "lobby_password"],
            properties: {
                lobby_id: { type: 'string' },
                lobby_name: { type: 'string', minLength: 3, maxLength: 255 },
                lobby_password: { type: 'string', minLength: 0, maxLength: 255 },
            }
        }
    }

    // Attribut permettant de donner les relations entre les tables.
    static relationMappings = {
        current_users: {
            relation: Model.HasManyRelation, // relation 0-n
            modelClass: Users,
            join: {
                from: 'Lobby.lobby_id',
                to: 'Users.lobby_id'
            }
        }       
    }
}