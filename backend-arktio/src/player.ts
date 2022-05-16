import { getUser } from "./bdd";

export interface PlayerJSON {
    uuid: string;
    name: string;
    token: number;
}

export class LobbyPlayer {

    private uuid: string;
    private name: string;
    private token: number;

    private constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
        this.token = 0;  
    }

    public static async instantiate(uuid: string) : Promise<LobbyPlayer> {
        let player : LobbyPlayer;
        await getUser(uuid).then(user => {
            player = new LobbyPlayer(user.user_uuid, user.user_name);
        });

        return player;
    }

    public getUUID() : string {
        return this.uuid;
    }

    public getName() : string {
        return this.name;
    }

    public getToken() : number {
        return this.token;
    }

    public setToken(token: number) : void {
        this.token = token;
    }

    public toJSON() : PlayerJSON {
        return {
            uuid: this.uuid,
            name: this.name,
            token: this.token,
        }
    }

};