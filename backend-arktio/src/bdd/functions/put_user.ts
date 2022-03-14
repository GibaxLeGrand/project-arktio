import { Users } from "../models/Users";
import { getUser } from "./get_user";

// Fonction insère un utilisateur dans la BDD
export async function putUser(pseudo: string, email: string, password: string): Promise<Users|void> {
    // !! Les requetes à la BDD sont toujours asynchrones !!
    const user = await Users.query()
        .insert({
            user_name: pseudo,
            user_email: email,
            user_password: password
        }).catch((e)=>console.error(e));
    return user;
}