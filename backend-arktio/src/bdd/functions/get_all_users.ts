import { Users } from "../models/Users";

// Fonction qui fait une simple query : On recherche tout les utilisateurs.
export async function getAllUsers(): Promise<Users[]> {
    // !! Les requetes à la BDD sont toujours asynchrones !!
    const users: Users[] = await Users.query()
        .select("*");

    return users;
}