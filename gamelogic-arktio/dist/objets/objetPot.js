"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetPot {
    constructor() {
        this.nom = "Pot en Verre";
        this.mois = state_1.Mois.OCTOBRE;
        this.point = 1;
        this.prix = 7;
    }
}
exports.default = ObjetPot;
