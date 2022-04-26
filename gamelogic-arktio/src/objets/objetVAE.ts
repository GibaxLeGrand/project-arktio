import {Objet} from "../objetManager";
import {Mois} from "../state";

export default class ObjetVAE implements Objet {
    nom: string = "VAE";
    mois: number = Mois.MARS;
    point: number = -20;
    prix: number = 800;
}