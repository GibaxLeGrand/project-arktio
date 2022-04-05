import { Users } from "../models/Users";
import { getUser } from "./get_user";

// Fonction qui modifie l'email d'un utilisateur et retourne l'utilisateur modifié
export async function setEmail(uuid: string, new_email: string): Promise<Users> {
    // On recherche l'utilisateur par son id et on modifie son email
    await Users.query()
        .patch({user_email: new_email})
        .where("user_uuid", "=", uuid);

    // On retourne l'utilisateur modifié
    const user: Promise<Users> = getUser(uuid);

    return user;
}