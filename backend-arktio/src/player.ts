
export interface PlayerJSON {
    uuid: string
}

export class Player {
    private uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }

    public getUUID() : string {
        return this.uuid;
    }

    public toJSON() : PlayerJSON {
        return {
            uuid: this.uuid
        }
    }

};