import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetPoissonRouge implements Objet {
    nom: string = "Poisson Rouge";
    mois: number = Mois.AVRIL;
    point: number = -15;
    prix: number = 40;
}