import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetKitBiere implements Objet {
    nom: string = "Kit biere maison";
    mois: number = Mois.JUIN;
    point: number = -15;
    prix: number = 50;
}