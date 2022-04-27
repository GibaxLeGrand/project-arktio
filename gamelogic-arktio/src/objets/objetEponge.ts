import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetEponge implements Objet {
    nom: string = "Éponge Lavable";
    mois: number = Mois.OCTOBRE;
    point: number = 5;
    prix: number = 4;
}