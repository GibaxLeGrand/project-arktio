import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetCampagneCrowdfunding implements Objet {
    nom: string = "Campagne de crowd-funding";
    mois: number = Mois.MAI;
    point: number = 20;
    prix: number = 20;
}