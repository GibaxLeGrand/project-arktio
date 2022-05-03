"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetPoissonRouge {
    constructor() {
        this.nom = "Poisson Rouge";
        this.mois = state_1.Mois.AVRIL;
        this.point = -15;
        this.prix = 40;
    }
}
exports.default = ObjetPoissonRouge;
