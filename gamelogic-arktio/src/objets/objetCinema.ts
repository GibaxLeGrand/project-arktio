import {Objet} from "../objetManager";

export default class ObjetCinema implements Objet {
    nom: string = "Abonnement Cinéma Engagé";
    mois: number = 6;
    point: number = -1;
    prix: number = 60;
}