import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetLivreOccasion implements Objet {
    nom: string = "Livre d'occasion";
    mois: number = Mois.DECEMBRE;
    point: number = 5;
    prix: number = 5;
}