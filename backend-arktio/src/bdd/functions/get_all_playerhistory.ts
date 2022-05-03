import { PlayerHistory } from "../models/PlayerHistory";

// Fonction qui retourne tout les historiques d'utilisateurs
export async function getAllPlayerHistory(): Promise<PlayerHistory[]> {
    // On récupère l'historique
    const playerhistory: PlayerHistory[] = await PlayerHistory.query()
        .select("*");

    return playerhistory;
}