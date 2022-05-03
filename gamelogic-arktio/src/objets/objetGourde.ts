import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetGourde implements Objet {
    nom: string = "Gourde";
    mois: number = Mois.NOVEMBRE;
    point: number = 5;
    prix: number = 25;
}