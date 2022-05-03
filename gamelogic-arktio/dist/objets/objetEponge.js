"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetEponge {
    constructor() {
        this.nom = "Éponge Lavable";
        this.mois = state_1.Mois.OCTOBRE;
        this.point = 5;
        this.prix = 4;
    }
}
exports.default = ObjetEponge;
