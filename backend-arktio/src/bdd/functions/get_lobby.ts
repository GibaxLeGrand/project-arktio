import { Lobby } from "../models/Lobby";

// Fonction qui récupère un lobby
export async function getLobby(uuid: string): Promise<Lobby[]> {
    // On récupère le lobby
    const lobby: Lobby[] = await Lobby.query()
        .select("*")
        .where("lobby_uuid", "=", uuid)
        .throwIfNotFound();

    return lobby;
}