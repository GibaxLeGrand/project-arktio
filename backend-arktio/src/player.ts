import { getUser } from "./bdd";
import { getUserFromUUID } from "./bdd/functions/get_user_authentificate";

export interface PlayerJSON {
    uuid: string;
    name: string;
    token: number;
}

export class LobbyPlayer {

    private uuid: string;
    private name: string;
    private token: number;

    constructor(uuid: string) {
        let that = this;
        getUser(uuid).then(user => {
            that.uuid = user.user_uuid;
            that.name = user.user_name;
            that.token = 0; 
        });
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