import {Objet} from "../objetManager";

export default class ObjetFournisseurElectricite implements Objet {
    nom: string = "Fournisseur d'électricité Écolo";
    mois: number =4;
    point: number = 20;
    prix: number = 12;
}