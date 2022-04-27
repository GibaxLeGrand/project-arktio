import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAdhesionAssoEco implements Objet {
    nom: string = "Association Eco";
    mois: number = Mois.JANVIER;
    point: number = 0;
    prix: number = 10;
}