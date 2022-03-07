
export class Player {
    private uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }

    public getUUID() : string {
        return this.uuid;
    }
};