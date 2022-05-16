import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAnimal implements Objet {
    nom: string = "Parrainer un animal";
    mois: number = Mois.AVRIL;
    point: number = 0;
    prix: number = 15;
}