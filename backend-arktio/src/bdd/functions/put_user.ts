import {Users} from "../models/Users";
import {getUser} from "./get_user";

// Fonction insère un utilisateur dans la BDD
export async function putUser(pseudo: string, email: string, password: string): Promise<Users | { errors: string[] }> {
    // !! Les requetes à la BDD sont toujours asynchrones !!

    let errorMessage: { errors: string[] } = {
        errors: []
    }

    const user = await Users.query()
        .insert({
            user_name: pseudo,
            user_email: email,
            user_password: password
        }).catch((e) => {
            if (e.data) {
                const error_keys = Object.keys(e.data);
                errorMessage.errors = error_keys.map((k)=>{
                    return `${k} : ${e.data[k][0].message}`
                })
            } else {
                errorMessage.errors = ["Account already exists."]
            }
        });
    return user || errorMessage;
}