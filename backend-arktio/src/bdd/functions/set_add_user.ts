import {Lobby} from "../models/Lobby";
import { Users } from "../models/Users";

// Fonction qui insère un joueur dans un lobby
export async function setAddUser(uuid: string, user: string): Promise<Lobby> {
    
    const lobbyHost: Lobby = await Lobby.query()
        .select("lobby_host")
        .where("lobby_uuid", "=", uuid)
        .first()
        .throwIfNotFound();

    await Users.query()
        .patch({user_current_lobby: uuid})
        .where("user_uuid", "=", user)
        .throwIfNotFound();

    const lobby: Lobby = await Lobby.query()
        .insert({
            lobby_uuid: uuid,
            lobby_password: lobbyHost.lobby_password,
            lobby_host: lobbyHost.lobby_host,
            lobby_users: user
        });
    
    return lobby;
}