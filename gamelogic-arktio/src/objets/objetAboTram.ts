import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAboTram implements Objet {
    nom: string = "Abonnement Tram";
    mois: number = Mois.MARS;
    point: number = 20;
    prix: number = 126;
}