import { History } from "../models/History";

// Fonction qui récupère une historique de partie
export async function getHistory(id: number): Promise<History> {
    // On récupère l'historique
    const history: History = await History.query()
        .where({ history_id: id })
        .first()
        .throwIfNotFound();

    return history;
}