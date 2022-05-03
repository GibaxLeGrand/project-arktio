import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetPompeSavon implements Objet {
    nom: string = "Pompe à savon liquide";
    mois: number = Mois.OCTOBRE;
    point: number = 0;
    prix: number = 3;
}