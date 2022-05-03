import crypto from "crypto"
import {Lobby} from "../models/Lobby";
import {Users} from "../models/Users";
import { getUser } from "./get_user";

// Pour générer un identifiant unique
declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

// Fonction qui insère un Lobby dans la BDD
export async function putLobby(password: string, host: string): Promise<Lobby> {
    
    // On vérifie si l'utilsateur existe
    const user: Users = await getUser(host);
    
    if (user === undefined) {
        throw new Error("User not found");
    }

    const lobby = await Lobby.query()
        .insert({
            lobby_uuid: crypto.randomUUID(),
            lobby_password: password,
            lobby_host: host,
            lobby_users: host
        });

    // On insère le lobby dans la table Users
    await Users.query()
        .patch({user_current_lobby: lobby.lobby_uuid})
        .where("user_uuid", "=", host);
    
    return lobby;
}