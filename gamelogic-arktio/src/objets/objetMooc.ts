import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetMooc implements Objet {
    nom: string = "Formation Mooc";
    mois: number = Mois.JUIN;
    point: number = 0;
    prix: number = 30;
}