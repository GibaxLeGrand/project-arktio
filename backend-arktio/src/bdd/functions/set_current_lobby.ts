import { Users } from "../models/Users";
import { getUser } from "./get_user";

// Fonction qui modifie le lobby d'un utilisateur et retourne l'utilisateur modifié
export async function setCurrentLobby(uuid: string, new_lobby: string): Promise<Users> {
    // On recherche l'utilisateur par son id et on modifie son pseudo
    await Users.query()
        .patch({user_current_lobby: new_lobby})
        .where("user_uuid", "=", uuid)
        .throwIfNotFound();

    // On retourne l'utilisateur modifié
    const user: Promise<Users> = getUser(uuid);

    return user;
}