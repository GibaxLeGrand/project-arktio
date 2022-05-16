import { Users } from "../models/Users";
import { getUser } from "./get_user";

// Fonction qui modifie le mot de passe d'un utilisateur et retourne l'utilisateur modifié
export async function setPassword(uuid: string, new_password: string): Promise<Users> {
    // On recherche l'utilisateur par son id et on modifie son mot de passe
    await Users.query()
        .patch({user_password: new_password})
        .where("user_uuid", "=", uuid)
        .throwIfNotFound();

    // On retourne l'utilisateur modifié
    const user: Promise<Users> = getUser(uuid);

    return user;
}