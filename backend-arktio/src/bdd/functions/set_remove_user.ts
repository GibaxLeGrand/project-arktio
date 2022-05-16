import {Lobby} from "../models/Lobby";
import { Users } from "../models/Users";
import { getUser } from "./get_user";

// Fonction qui enlève un joueur dans un lobby
export async function setDeleteUser(uuid: string, user: string): Promise<void> {
    
    // On vérifie si l'utilsateur existe
    const delUser: Users = await getUser(user);
    
    if (delUser === undefined) {
        throw new Error("User not found");
    }

    // On fait une query pour récupérer le lobby
    const lobby: Lobby[] = await Lobby.query()
        .select("*")
        .where("lobby_uuid", "=", uuid)
        .throwIfNotFound();

    if (lobby[0] === undefined) {
        throw new Error("Lobby not found");
    }

    // On vérifie si l'utilisateur n'est pas le host
    if (lobby[0].lobby_host === user) {
        // On cherche l'index où se situe le host dans le lobby
        const index: number = lobby.findIndex(element => element.lobby_users == user);
        // On le supprime
        lobby.splice(index, 1);
        // On choisit un nouveau host
        let new_host: string | undefined;

        for (let i = 0; i < lobby.length; i++) {
            if (lobby[i]?.lobby_users != user) {
                new_host = lobby[i]?.lobby_users;
                break;
            }
        }

        if (new_host === undefined) {
            throw new Error("Can't find index user in lobby");
        }
        // On met à jour le lobby
        await Lobby.query()
            .patch({lobby_host: new_host})
            .where("lobby_uuid", "=", uuid);
    }
    // On modifie l'utilisateur pour qu'il ne soit plus dans le lobby
    await Users.query()
        .patch({user_current_lobby: ""})
        .where("user_uuid", "=", user);
    // On enlève l'utilisateur du lobby
    await Lobby.query()
        .delete()
        .where("lobby_uuid", "=", uuid)
        .where("lobby_users", "=", user);
}