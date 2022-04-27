import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetVerteRevolutionnaire implements Objet {
    nom: string = "Innovation \"Verte et Révolutionnaire\"";
    mois: number = Mois.MAI;
    point: number = -10;
    prix: number = 150;
}