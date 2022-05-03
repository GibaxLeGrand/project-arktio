"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetLivreEco {
    constructor() {
        this.nom = "Livre Eco-responsable";
        this.mois = state_1.Mois.JANVIER;
        this.point = 0;
        this.prix = 18;
    }
}
exports.default = ObjetLivreEco;
