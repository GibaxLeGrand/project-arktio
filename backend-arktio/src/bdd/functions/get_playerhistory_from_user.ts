import { PlayerHistory } from "../models/PlayerHistory";

// Fonction qui récupère tout l'historique d'un joueur
export async function getPlayerHistoryFromUser(uuid: string): Promise<PlayerHistory[]> {
    // On récupère toutes les parties où le joueur est présent
    const history: PlayerHistory[] = await PlayerHistory.query()
        .where("user_uuid", "=", uuid);

    // On récupère les scores des parties
    const playerhistory: PlayerHistory[] = await PlayerHistory.query()
        .whereIn("history_id", history.map(h => h.history_id))
        .orderBy([{ column: "history_id", order: "desc" }, { column: "playerhistory_score", order: "desc" }])

    return playerhistory;
}