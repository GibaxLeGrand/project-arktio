import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetAdhesionAssoReparation implements Objet {
    nom: string = "Association de Réparation";
    mois: number = Mois.JANVIER;
    point: number = 0;
    prix: number = 10;
}