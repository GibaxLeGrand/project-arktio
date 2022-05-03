"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetOrdinateur {
    constructor() {
        this.nom = "Ordinateur";
        this.mois = state_1.Mois.SEPTEMBRE;
        this.point = -1;
        this.prix = 300;
    }
}
exports.default = ObjetOrdinateur;
