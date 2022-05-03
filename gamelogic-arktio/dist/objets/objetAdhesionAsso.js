"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAdhesionAsso {
    constructor() {
        this.nom = "Adhésion à l'association";
        this.mois = state_1.Mois.JUIN;
        this.point = 0;
        this.prix = 10;
    }
}
exports.default = ObjetAdhesionAsso;
