import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAboStream implements Objet {
    nom: string = "Abonnement Streaming";
    mois: number = Mois.FEVRIER;
    point: number = -20;
    prix: number = 80;
}