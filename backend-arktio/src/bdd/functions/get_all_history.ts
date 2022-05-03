import { History } from "../models/History";

// Fonction qui retourne tout les historiques de parties
export async function getAllHistory(): Promise<History[]> {
    // On récupère l'historique
    const history: History[] = await History.query()
        .select("*");

    return history;
}