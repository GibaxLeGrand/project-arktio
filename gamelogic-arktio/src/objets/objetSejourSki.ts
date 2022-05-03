import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetSejourSki implements Objet {
    nom: string = "Séjour au ski dans les vosges";
    mois: number = Mois.DECEMBRE;
    point: number = 10;
    prix: number = 200;
}