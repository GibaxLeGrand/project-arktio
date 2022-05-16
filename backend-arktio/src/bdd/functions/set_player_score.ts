import { PlayerHistory } from "../models/PlayerHistory";

// Fonction qui met à jour le score d'un joueur
export async function setPlayerScore(history_id: number, user_uuid: string, score: number): Promise<void> {
    // On met à jour le score
    await PlayerHistory.query()
        .patch({
            playerhistory_score: score
        })
        .where("history_id", "=", history_id)
        .where("user_uuid", "=", user_uuid)
        .throwIfNotFound();
}