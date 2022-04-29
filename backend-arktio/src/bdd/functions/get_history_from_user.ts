import { PlayerHistory } from "../models/PlayerHistory";
import { History } from "../models/History";

// Fonction qui récupère tout l'historique de partie d'un utilisateur
export async function getHistoryFromUser(uuid: string): Promise<History[]> {
    
    // On récupère toutes les parties où le joueur est présent
    const playerhistory: PlayerHistory[] = await PlayerHistory.query()
        .where("user_uuid", "=", uuid);

    // On fait une jointure
    const history: History[] = await History.query()
        .whereIn("history_id", playerhistory.map(h => h.history_id))
        .orderBy("history_id", "asc")

    return history;
}