import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetLivreEco implements Objet {
    nom: string = "Livre Eco-responsable";
    mois: number = Mois.JANVIER;
    point: number = 0;
    prix: number = 18;
}