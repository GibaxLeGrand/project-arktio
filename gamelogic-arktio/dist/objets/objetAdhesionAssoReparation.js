"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAdhesionAssoReparation {
    constructor() {
        this.nom = "Association de Réparation";
        this.mois = state_1.Mois.JANVIER;
        this.point = 0;
        this.prix = 10;
    }
}
exports.default = ObjetAdhesionAssoReparation;
