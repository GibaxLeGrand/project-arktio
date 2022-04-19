
export interface PlayerJSON {
    uuid: string;
    name: string;
    pion: number;
}

export class LobbyPlayer {

    private uuid: string;
    private name: string;

    constructor(uuid: string) {
        this.uuid = uuid;
        this.name = "oui";
    }

    public getUUID() : string {
        return this.uuid;
    }

    public getName() : string {
        return this.name;
    }

    public toJSON() : PlayerJSON {
        return {
            uuid: this.uuid,
            name: this.name,
            pion: 0
        }
    }

};