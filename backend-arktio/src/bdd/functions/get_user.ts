import { Users } from "../models/Users";

// Fonction qui retourne un utilisateur dans la BDD par son id ou email et mot de passe.
export async function getUser(id: number): Promise<Users> {
    // On recherche l'utilisateur par son id
    const user: Users[] = await Users.query()
        .select("user_id", "user_name")
        .where("user_id", "=", id)
        .throwIfNotFound();

    return user[0];
}