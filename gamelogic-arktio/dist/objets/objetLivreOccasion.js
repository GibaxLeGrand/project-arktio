"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetLivreOccasion {
    constructor() {
        this.nom = "Livre d'occasion";
        this.mois = state_1.Mois.DECEMBRE;
        this.point = 5;
        this.prix = 5;
    }
}
exports.default = ObjetLivreOccasion;
