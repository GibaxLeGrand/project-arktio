import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetSacAchat implements Objet {
    nom: string = "Sac pour achat en vrac";
    mois: number = Mois.NOVEMBRE;
    point: number = 0;
    prix: number = 5;
}