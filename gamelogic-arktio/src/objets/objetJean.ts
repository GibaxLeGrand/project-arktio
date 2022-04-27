import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetJean implements Objet {
    nom: string = "Jean neuf";
    mois: number = Mois.DECEMBRE;
    point: number = -20;
    prix: number = 25;
}