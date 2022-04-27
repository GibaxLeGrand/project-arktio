import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetFournisseurElectricite implements Objet {
    nom: string = "Fournisseur d'électricité Écolo";
    mois: number = Mois.MAI;
    point: number = 20;
    prix: number = 12;
}