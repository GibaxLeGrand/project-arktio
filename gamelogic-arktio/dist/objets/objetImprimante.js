"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetImprimante {
    constructor() {
        this.nom = "Imprimante d'Occasion";
        this.mois = state_1.Mois.FEVRIER;
        this.point = 10;
        this.prix = 70;
    }
}
exports.default = ObjetImprimante;
