"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetTelephone {
    constructor() {
        this.nom = "Téléphone Reconditionné";
        this.mois = state_1.Mois.FEVRIER;
        this.point = 0;
        this.prix = 250;
    }
}
exports.default = ObjetTelephone;
