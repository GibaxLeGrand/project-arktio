import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAdhesionAsso implements Objet {
    nom: string = "Adhésion à l'association";
    mois: number = Mois.JUIN;
    point: number = 0;
    prix: number = 10;
}