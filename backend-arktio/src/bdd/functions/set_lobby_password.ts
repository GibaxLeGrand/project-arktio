import {Lobby} from "../models/Lobby";

// Fonction qui change le mot de passe d'un lobby
export async function setLobbyPassword(uuid:string, password: string): Promise<void> {
    
    await Lobby.query()
        .patch({lobby_password: password})
        .where("lobby_uuid", "=", uuid)
        .throwIfNotFound();
}