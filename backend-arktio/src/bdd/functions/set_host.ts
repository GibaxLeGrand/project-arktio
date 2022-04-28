import {Lobby} from "../models/Lobby";

// Fonction qui change l'hôte d'un lobby
export async function setHost(uuid: string, host: string): Promise<void> {
    
    await Lobby.query()
        .patch({lobby_host: host})
        .where("lobby_uuid", "=", uuid)
        .throwIfNotFound(); 
}