"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAssoBiodiversite {
    constructor() {
        this.nom = "Adhésion association biodiversité";
        this.mois = state_1.Mois.AVRIL;
        this.point = 0;
        this.prix = 10;
    }
}
exports.default = ObjetAssoBiodiversite;
