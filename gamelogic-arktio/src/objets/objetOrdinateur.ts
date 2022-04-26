import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetOrdinateur implements Objet {
    nom: string = "Ordinateur";
    mois: number = Mois.SEPTEMBRE;
    point: number = -1;
    prix: number = 300;
}