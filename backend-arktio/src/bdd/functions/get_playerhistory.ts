import { PlayerHistory } from "../models/PlayerHistory";

// Fonction qui retourne un playerhistory
export async function getPlayerHistory(id: number): Promise<PlayerHistory[]> {
    // On récupère l'historique
    const playerhistory: PlayerHistory[] = await PlayerHistory.query()
        .where({ history_id: id })
        .orderBy("playerhistory_score", "desc")
        .throwIfNotFound();

    return playerhistory;
}