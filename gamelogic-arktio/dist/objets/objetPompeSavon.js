"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetPompeSavon {
    constructor() {
        this.nom = "Pompe à savon liquide";
        this.mois = state_1.Mois.OCTOBRE;
        this.point = 0;
        this.prix = 3;
    }
}
exports.default = ObjetPompeSavon;
