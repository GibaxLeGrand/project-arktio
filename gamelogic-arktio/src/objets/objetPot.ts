import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetPot implements Objet {
    nom: string = "Pot en Verre";
    mois: number = Mois.OCTOBRE;
    point: number = 1;
    prix: number = 7;
}