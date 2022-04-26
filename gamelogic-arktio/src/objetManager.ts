import ObjetAdhesionAssoEco from "./objets/objetAdhesionAssoEco";
import ObjetAdhesionAssoReparation from "./objets/objetAdhesionAssoReparation";
import ObjetLivreEco from "./objets/objetLivreEco";
import ObjetTelephone from "./objets/objetTelephone";
import ObjetAboStream from "./objets/objetAboStream";
import ObjetImprimante from "./objets/objetImprimante";
import ObjetAboTram from "./objets/objetAboTram";
import ObjetDriveVelo from "./objets/objetDriveVelo";
import ObjetVAE from "./objets/objetVAE";
import ObjetAnimal from "./objets/ObjetAnimal";
import ObjetAssoBiodiversite from "./objets/objetAssoBiodiversite";
import ObjetPoissonRouge from "./objets/objetPoissonRouge";
import ObjetFournisseurElectricite from "./objets/ObjetFournisseurElectricite";
import ObjetCampagneCrowdfunding from "./objets/objetCampagneCrowdfunding";
import ObjetVerteRevolutionnaire from "./objets/objetVerteRevolutionnaire";
import ObjetMooc from "./objets/objetMooc";
import ObjetKitBiere from "./objets/objetKitBiere";
import ObjetAdhesionAsso from "./objets/ObjetAdhesionAsso";
import ObjetOrdinateur from "./objets/objetOrdinateur";
import ObjetCinema from "./objets/objetCinema";
import ObjetCasqueAudio from "./objets/objetCasqueAudio";
import ObjetPot from "./objets/objetPot";
import ObjetEponge from "./objets/objetEponge";
import ObjetPompeSavon from "./objets/objetPompeSavon";
import ObjetGourde from "./objets/objetGourde";
import ObjetSacAchat from "./objets/objetSacAchat";
import ObjetCouvertBambou from "./objets/objetCouvertBambou";
import ObjetJean from "./objets/objetJean";
import ObjetLivreOccasion from "./objets/objetLivreOccasion";
import ObjetSejourSki from "./objets/objetSejourSki";


export interface Objet {
    nom: string;
    point: number;
    mois: number;
    prix: number;
}

export class ObjetManager {
    private static _objets: { [key: number]: Objet } = {};

    public static getObjet(objetID: number): Objet {
        return this._objets[objetID];
    }

    public static getObjets(): { [key: number]: Objet } {
        return this._objets;
    }

    public static addObjet(objetID : number, objet: Objet): void {
        console.log("Adding " + objet.constructor.name + " \t as ID " + objetID);
        this._objets[objetID] = objet;
    }

    public static initObjets() {
        this.addObjet(0, new ObjetAdhesionAssoEco());
        this.addObjet(1, new ObjetAdhesionAssoReparation());
        this.addObjet(2, new ObjetLivreEco());
        this.addObjet(3, new ObjetTelephone());
        this.addObjet(4, new ObjetAboStream());
        this.addObjet(5, new ObjetImprimante());
        this.addObjet(6, new ObjetAboTram());
        this.addObjet(7, new ObjetDriveVelo());
        this.addObjet(8, new ObjetVAE());
        this.addObjet(9, new ObjetAnimal());
        this.addObjet(10, new ObjetAssoBiodiversite());
        this.addObjet(11, new ObjetPoissonRouge());
        this.addObjet(12, new ObjetFournisseurElectricite());
        this.addObjet(13, new ObjetCampagneCrowdfunding());
        this.addObjet(14, new ObjetVerteRevolutionnaire());
        this.addObjet(15, new ObjetMooc());
        this.addObjet(16, new ObjetKitBiere());
        this.addObjet(17, new ObjetAdhesionAsso());
        this.addObjet(18, new ObjetOrdinateur());
        this.addObjet(19, new ObjetCinema());
        this.addObjet(20, new ObjetCasqueAudio());
        this.addObjet(21, new ObjetPot());
        this.addObjet(22, new ObjetEponge());
        this.addObjet(23, new ObjetPompeSavon());
        this.addObjet(24, new ObjetGourde());
        this.addObjet(25, new ObjetSacAchat());
        this.addObjet(26, new ObjetCouvertBambou());
        this.addObjet(27, new ObjetJean());
        this.addObjet(28, new ObjetLivreOccasion());
        this.addObjet(29, new ObjetSejourSki());
    }

    public static howManyObjets() : number {
        return Object.keys(this._objets).length;
    }

}