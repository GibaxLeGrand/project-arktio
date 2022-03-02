import { Users } from "./models/Users";

// Fonction qui fait une simple query
async function getUsers(): Promise<Users[]> {
    // Ici, on cherche tout les utilisateurs dans la table Users
    // !! Les requetes à la BDD sont toujours asynchrones !!
    const users = await Users.query()
        .select("*");

    return users;
}

export default getUsers;