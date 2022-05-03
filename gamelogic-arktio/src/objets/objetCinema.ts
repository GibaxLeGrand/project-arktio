import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetCinema implements Objet {
    nom: string = "Abonnement Cinéma Engagé";
    mois: number = Mois.SEPTEMBRE;
    point: number = -1;
    prix: number = 60;
}