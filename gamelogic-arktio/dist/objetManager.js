"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetManager = void 0;
const objetAdhesionAssoEco_1 = __importDefault(require("./objets/objetAdhesionAssoEco"));
const objetAdhesionAssoReparation_1 = __importDefault(require("./objets/objetAdhesionAssoReparation"));
const objetLivreEco_1 = __importDefault(require("./objets/objetLivreEco"));
const objetTelephone_1 = __importDefault(require("./objets/objetTelephone"));
const objetAboStream_1 = __importDefault(require("./objets/objetAboStream"));
const objetImprimante_1 = __importDefault(require("./objets/objetImprimante"));
const objetAboTram_1 = __importDefault(require("./objets/objetAboTram"));
const objetDriveVelo_1 = __importDefault(require("./objets/objetDriveVelo"));
const objetVAE_1 = __importDefault(require("./objets/objetVAE"));
const objetAnimal_1 = __importDefault(require("./objets/objetAnimal"));
const objetAssoBiodiversite_1 = __importDefault(require("./objets/objetAssoBiodiversite"));
const objetPoissonRouge_1 = __importDefault(require("./objets/objetPoissonRouge"));
const ObjetFournisseurElectricite_1 = __importDefault(require("./objets/ObjetFournisseurElectricite"));
const objetCampagneCrowdfunding_1 = __importDefault(require("./objets/objetCampagneCrowdfunding"));
const objetVerteRevolutionnaire_1 = __importDefault(require("./objets/objetVerteRevolutionnaire"));
const objetMooc_1 = __importDefault(require("./objets/objetMooc"));
const objetKitBiere_1 = __importDefault(require("./objets/objetKitBiere"));
const objetAdhesionAsso_1 = __importDefault(require("./objets/objetAdhesionAsso"));
const objetOrdinateur_1 = __importDefault(require("./objets/objetOrdinateur"));
const objetCinema_1 = __importDefault(require("./objets/objetCinema"));
const objetCasqueAudio_1 = __importDefault(require("./objets/objetCasqueAudio"));
const objetPot_1 = __importDefault(require("./objets/objetPot"));
const objetEponge_1 = __importDefault(require("./objets/objetEponge"));
const objetPompeSavon_1 = __importDefault(require("./objets/objetPompeSavon"));
const objetGourde_1 = __importDefault(require("./objets/objetGourde"));
const objetSacAchat_1 = __importDefault(require("./objets/objetSacAchat"));
const objetCouvertBambou_1 = __importDefault(require("./objets/objetCouvertBambou"));
const objetJean_1 = __importDefault(require("./objets/objetJean"));
const objetLivreOccasion_1 = __importDefault(require("./objets/objetLivreOccasion"));
const objetSejourSki_1 = __importDefault(require("./objets/objetSejourSki"));
class ObjetManager {
    static getObjet(objetID) {
        return this._objets[objetID];
    }
    static getObjets() {
        return this._objets;
    }
    static addObjet(objetID, objet) {
        console.log("Adding " + objet.constructor.name + " \t as ID " + objetID);
        this._objets[objetID] = objet;
    }
    static initObjets() {
        this.addObjet(0, new objetAdhesionAssoEco_1.default());
        this.addObjet(1, new objetAdhesionAssoReparation_1.default());
        this.addObjet(2, new objetLivreEco_1.default());
        this.addObjet(3, new objetTelephone_1.default());
        this.addObjet(4, new objetAboStream_1.default());
        this.addObjet(5, new objetImprimante_1.default());
        this.addObjet(6, new objetAboTram_1.default());
        this.addObjet(7, new objetDriveVelo_1.default());
        this.addObjet(8, new objetVAE_1.default());
        this.addObjet(9, new objetAnimal_1.default());
        this.addObjet(10, new objetAssoBiodiversite_1.default());
        this.addObjet(11, new objetPoissonRouge_1.default());
        this.addObjet(12, new ObjetFournisseurElectricite_1.default());
        this.addObjet(13, new objetCampagneCrowdfunding_1.default());
        this.addObjet(14, new objetVerteRevolutionnaire_1.default());
        this.addObjet(15, new objetMooc_1.default());
        this.addObjet(16, new objetKitBiere_1.default());
        this.addObjet(17, new objetAdhesionAsso_1.default());
        this.addObjet(18, new objetOrdinateur_1.default());
        this.addObjet(19, new objetCinema_1.default());
        this.addObjet(20, new objetCasqueAudio_1.default());
        this.addObjet(21, new objetPot_1.default());
        this.addObjet(22, new objetEponge_1.default());
        this.addObjet(23, new objetPompeSavon_1.default());
        this.addObjet(24, new objetGourde_1.default());
        this.addObjet(25, new objetSacAchat_1.default());
        this.addObjet(26, new objetCouvertBambou_1.default());
        this.addObjet(27, new objetJean_1.default());
        this.addObjet(28, new objetLivreOccasion_1.default());
        this.addObjet(29, new objetSejourSki_1.default());
    }
    static howManyObjets() {
        return Object.keys(this._objets).length;
    }
}
exports.ObjetManager = ObjetManager;
ObjetManager._objets = {};
