import { Model } from "objection";
// import { Users } from "./Users";

export class Lobby extends Model {
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    lobby_uuid!: string;
    lobby_password!: string;

    // lobby_host!: Users;
    // lobby_users!: Users[];
    lobby_host!: string;
    lobby_users!: string;

    // Propiété obligatoire à ajouter qui permet de retrouver la table
    static override get tableName() {
        return "Lobby";
    }
    // Spécifie la colone de la clé primaire de la table
    static override get idColumn() {
        return "lobby_uuid";
    }

    // D'autres options oeuvent être définis, optionnel mais utile
    // pour essentiellement la validation de la requête demandée.
    
    // Méthode permettant de vérifier les données avant d'insèrer dans la BDD.
    static override get jsonSchema() {
        return {
            type: "object",
            required : ["lobby_uuid", "lobby_name", "lobby_password"],
            properties: {
                lobby_uuid: { type: 'string' },
                lobby_name: { type: 'string', minLength: 3, maxLength: 255 },
                lobby_password: { type: 'string', minLength: 0, maxLength: 255 },
            }
        }
    }

    // Attribut permettant de donner les relations entre les tables.
    // /!\ Bug : Les relations semblent pas marcher
    /*
    static override relationMappings = {
        // Hôte du lobby
        lobby_host: {
            relation: Model.HasOneRelation, // relation 1-1 (Un seul hôte)
            modelClass: Users,
            join: {
                from: 'Lobby.lobby_host',
                to: 'Users.user_uuid'
            }
        },
        // Les joueurs dans le lobby
        lobby_users: {
            relation: Model.HasManyRelation, // relation 0-n
            modelClass: Users,
            join: {
                from: 'Lobby.lobby_uuid',
                to: 'Users.lobby_uuid'
            }
        }       
    }
    */
}