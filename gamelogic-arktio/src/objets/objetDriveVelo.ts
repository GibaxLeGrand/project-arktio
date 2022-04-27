import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetDriveVelo implements Objet {
    nom: string = "Souscription drive à Vélo";
    mois: number = Mois.MARS;
    point: number = 0;
    prix: number = 40;
}