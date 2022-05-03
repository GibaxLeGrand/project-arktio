import { History } from "../models/History";
import { getHistory } from "./get_history";

// Fonction qui met à jour l'historique de la partie
export async function setHistoryStart(id: number, start: Date): Promise<History> {
    // On met à jour l'historique
    await History.query()
        .patch({ history_start: start })
        .where({ history_id: id })
        .throwIfNotFound();

    // On récupère l'historique
    const history: History = await getHistory(id);

    return history;
}