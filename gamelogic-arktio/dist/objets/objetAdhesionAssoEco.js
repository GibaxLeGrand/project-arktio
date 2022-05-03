"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAdhesionAssoEco {
    constructor() {
        this.nom = "Association Eco";
        this.mois = state_1.Mois.JANVIER;
        this.point = 0;
        this.prix = 10;
    }
}
exports.default = ObjetAdhesionAssoEco;
