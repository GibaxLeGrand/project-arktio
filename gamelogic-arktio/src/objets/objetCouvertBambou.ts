import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetCouvertBambou implements Objet {
    nom: string = "Couvert en Bambou";
    mois: number = Mois.NOVEMBRE;
    point: number = -5;
    prix: number = 5;
}