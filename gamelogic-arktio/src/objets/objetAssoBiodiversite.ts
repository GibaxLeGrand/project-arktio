import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAssoBiodiversite implements Objet {
    nom: string = "Adhésion association biodiversité";
    mois: number = Mois.AVRIL;
    point: number = 0;
    prix: number = 10;
}