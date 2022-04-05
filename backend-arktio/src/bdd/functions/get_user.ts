import { Users } from "../models/Users";

// Fonction qui retourne un utilisateur dans la BDD par son id ou email et mot de passe.
export async function getUser(uuid: string): Promise<Users> {
    // On recherche l'utilisateur par son id
    const user: Users[] = await Users.query()
        .select("user_uuid", "user_name")
        .where("user_uuid", "=", uuid)
        .throwIfNotFound();

    return user[0];
}