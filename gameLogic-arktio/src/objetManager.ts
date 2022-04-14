import ObjetOrdinateur from "./objets/objetOrdinateur";

export interface Objet {
    nom: string;
}

export class ObjetManager {
    private static _objets: { [key: number]: Objet } = {};

    public static getObjet(objetID: number): Objet {
        return this._objets[objetID];
    }


    public static addObjet(objetID : number, objet: Objet): void {
        console.log("Adding " + objet.constructor.name + " \t as ID " + objetID);
        this._objets[objetID] = objet;
    }

    public static initObjets() {
        this.addObjet(0, new ObjetOrdinateur())
    }

    public static howManyObjets() : number {
        return Object.keys(this._objets).length;
    }

}