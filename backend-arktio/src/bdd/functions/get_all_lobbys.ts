import { Lobby } from "../models/Lobby";

// Fonction qui récupère tous les lobbys
export async function getAllLobbys(): Promise<Lobby[]> {
    // On récupère le lobby
    const lobby: Lobby[] = await Lobby.query()
        .select("*");

    return lobby;
}