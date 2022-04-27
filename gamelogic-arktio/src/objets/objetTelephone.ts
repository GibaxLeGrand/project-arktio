import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetTelephone implements Objet {
    nom: string = "Téléphone Reconditionné";
    mois: number = Mois.FEVRIER;
    point: number = 0;
    prix: number = 250;
}