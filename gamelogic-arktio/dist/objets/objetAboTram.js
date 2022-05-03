"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAboTram {
    constructor() {
        this.nom = "Abonnement Tram";
        this.mois = state_1.Mois.MARS;
        this.point = 20;
        this.prix = 126;
    }
}
exports.default = ObjetAboTram;
