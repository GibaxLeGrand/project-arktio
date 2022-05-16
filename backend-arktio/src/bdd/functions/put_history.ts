import { History } from "../models/History"
import { PlayerHistory } from "../models/PlayerHistory";
import { Users } from "../models/Users";

// Fonction qui insère une historique de partie et les joueurs associés
// Note : cette fonction prend en paramètre les identifiants des joueurs et n'est pas de type Users
export async function putHistory(players: string[]): Promise<History> {
    // On vérifie que les utilisateurs existent
    const users: Users[] = await Users.query()
        .whereIn("user_uuid", players)
        .throwIfNotFound();

    // On crée l'historique
    const history: History = await History.query()
        .insert({
            history_start: new Date(),
            history_end: new Date()
        });

    // On crée les joueurs associés
    for (let i = 0; i < users.length; i++) {
        await PlayerHistory.query()
            .insert({
                playerhistory_score: 0,
                user_uuid: users[i].user_uuid,
                history_id: history.history_id
            });
    }

    return history;
}