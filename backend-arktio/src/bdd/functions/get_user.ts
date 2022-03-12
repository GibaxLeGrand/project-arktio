import { Users } from "../models/Users";

// Fonction qui retourne un utilisateur dans la BDD par son id ou email et mot de passe.
export async function getUser(id: number | string, password?: string): Promise<Users> {
    // On recherche par son ID, sinon par son email et son mot de passe. 
    if (typeof(id) == "number") {

        const user: Users[] = await Users.query()
            .select("*")
            .where("user_id", "=", `${id}`);

        return user[0];
    } else {

        const user: Users[] = await Users.query()
            .select("*")
            .where("user_email", "=", `${id}`)
            .where("user_password", "=", `${password}`);

        return user[0];
    } 
}