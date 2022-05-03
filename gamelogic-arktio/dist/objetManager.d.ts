import { Mois } from "./state";
export interface Objet {
    nom: string;
    point: number;
    mois: Mois;
    prix: number;
}
export declare class ObjetManager {
    private static _objets;
    static getObjet(objetID: number): Objet;
    static getObjets(): {
        [key: number]: Objet;
    };
    static addObjet(objetID: number, objet: Objet): void;
    static initObjets(): void;
    static howManyObjets(): number;
}
