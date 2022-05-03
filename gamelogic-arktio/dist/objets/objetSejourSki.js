"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetSejourSki {
    constructor() {
        this.nom = "Séjour au ski dans les vosges";
        this.mois = state_1.Mois.DECEMBRE;
        this.point = 10;
        this.prix = 200;
    }
}
exports.default = ObjetSejourSki;
