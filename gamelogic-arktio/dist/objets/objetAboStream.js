"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAboStream {
    constructor() {
        this.nom = "Abonnement Streaming";
        this.mois = state_1.Mois.FEVRIER;
        this.point = -20;
        this.prix = 80;
    }
}
exports.default = ObjetAboStream;
