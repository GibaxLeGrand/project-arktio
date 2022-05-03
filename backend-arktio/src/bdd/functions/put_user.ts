import { randomUUID } from "crypto"
import {Users} from "../models/Users";

// Fonction insère un utilisateur dans la BDD
export async function putUser(pseudo: string, email: string, password: string): Promise<Users> {
    // !! Les requetes à la BDD sont toujours asynchrones !!
    console.log(`putUser: ${pseudo} ${email} ${password} ${randomUUID()}`);
    const user = await Users.query()
        .insert({
            user_uuid: randomUUID(),
            user_name: pseudo,
            user_email: email,
            user_password: password
        });

    console.log(`putUser: ${user.user_uuid} ${user.user_name} ${user.user_email} ${user.user_password}`);

    return user;
}