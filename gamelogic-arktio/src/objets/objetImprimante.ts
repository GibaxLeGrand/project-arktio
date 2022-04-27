import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetImprimante implements Objet {
    nom: string = "Imprimante d'Occasion";
    mois: number = Mois.FEVRIER;
    point: number = 10;
    prix: number = 70;
}