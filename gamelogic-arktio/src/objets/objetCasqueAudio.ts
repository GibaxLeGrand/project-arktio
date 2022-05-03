import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetCasqueAudio implements Objet {
    nom: string = "Casque Audio";
    mois: number = Mois.SEPTEMBRE;
    point: number = -1;
    prix: number = 60;
}