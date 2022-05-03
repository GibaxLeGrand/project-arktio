"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetFournisseurElectricite {
    constructor() {
        this.nom = "Fournisseur d'électricité Écolo";
        this.mois = state_1.Mois.MAI;
        this.point = 20;
        this.prix = 12;
    }
}
exports.default = ObjetFournisseurElectricite;
