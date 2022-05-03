"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetCinema {
    constructor() {
        this.nom = "Abonnement Cinéma Engagé";
        this.mois = state_1.Mois.SEPTEMBRE;
        this.point = -1;
        this.prix = 60;
    }
}
exports.default = ObjetCinema;
