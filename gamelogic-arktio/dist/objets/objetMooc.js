"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetMooc {
    constructor() {
        this.nom = "Formation Mooc";
        this.mois = state_1.Mois.JUIN;
        this.point = 0;
        this.prix = 30;
    }
}
exports.default = ObjetMooc;
