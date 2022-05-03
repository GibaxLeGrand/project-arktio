"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetGourde {
    constructor() {
        this.nom = "Gourde";
        this.mois = state_1.Mois.NOVEMBRE;
        this.point = 5;
        this.prix = 25;
    }
}
exports.default = ObjetGourde;
