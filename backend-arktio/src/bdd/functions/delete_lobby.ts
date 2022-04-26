import {Lobby} from "../models/Lobby";
import {Users} from "../models/Users";

// Fonction qui supprime un Lobby dans la BDD
export async function deleteLobby(uuid: string): Promise<void> {

    await Users.query()
        .patch({user_current_lobby: ""})
        .join("Lobby", "Users.user_current_lobby", "Lobby.lobby_uuid")
        .where("Lobby.lobby_uuid", "=", uuid);

    await Lobby.query()
        .delete()
        .where("lobby_uuid", "=", uuid);
}