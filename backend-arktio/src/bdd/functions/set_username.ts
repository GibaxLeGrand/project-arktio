import { Users } from "../models/Users";
import { getUser } from "./get_user";

// Fonction qui modifie le pseudo d'un utilisateur et retourne l'utilisateur modifié
export async function setUsername(uuid: string, new_username: string): Promise<Users> {
    // On recherche l'utilisateur par son id et on modifie son pseudo
    await Users.query()
        .patch({user_name: new_username})
        .where("user_uuid", "=", uuid);

    // On retourne l'utilisateur modifié
    const user: Promise<Users> = getUser(uuid);

    return user;
}