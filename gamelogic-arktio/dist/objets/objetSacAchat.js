"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetSacAchat {
    constructor() {
        this.nom = "Sac pour achat en vrac";
        this.mois = state_1.Mois.NOVEMBRE;
        this.point = 0;
        this.prix = 5;
    }
}
exports.default = ObjetSacAchat;
