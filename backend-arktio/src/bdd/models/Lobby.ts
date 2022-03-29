import { Model } from "objection";

export class Lobby extends Model{
    // Attibuts à définir pour pouvoir utiliser les valeurs.
    lobby_id!: number;
    lobby_name!: number;
    
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
            required : ["lobby_id", "lobby_name"],
            properties: {
                lobby_id: { type: 'number' },
                lobby_name: { type: 'string', minLength: 3, maxLength: 256 },
            }
        }
    }
}