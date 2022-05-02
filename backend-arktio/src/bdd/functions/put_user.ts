import crypto from "crypto"
import {Users} from "../models/Users";

// Pour générer un identifiant unique
declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

// Fonction insère un utilisateur dans la BDD
export async function putUser(pseudo: string, email: string, password: string): Promise<Users> {
    // !! Les requetes à la BDD sont toujours asynchrones !!
    const user = await Users.query()
        .insert({
            user_uuid: crypto.randomUUID(),
            user_name: pseudo,
            user_email: email,
            user_password: password
        });

    return user;
}