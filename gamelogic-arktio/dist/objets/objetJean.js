"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetJean {
    constructor() {
        this.nom = "Jean neuf";
        this.mois = state_1.Mois.DECEMBRE;
        this.point = -20;
        this.prix = 25;
    }
}
exports.default = ObjetJean;
