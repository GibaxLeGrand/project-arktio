import { Users } from "../models/Users";

// Fonction qui retourne un utilisateur dans la BDD par son id ou email et mot de passe.
export async function getUserAuthentificate(email: string): Promise<Users> {
    // On recherche l'utilisateur par son email
    const user: Users[] = await Users.query()
        .select("*")
        .where("user_email", "=", email)
        .throwIfNotFound();

    // throw error
    if (user[0] === undefined) {
        throw new Error("User not found");
    }

    return user[0];
}