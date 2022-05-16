import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetKitReparation implements Objet {
    nom: string = "Kit de Réparation";
    mois: number = -1;
    point: number = 0;
    prix: number = 0;
}