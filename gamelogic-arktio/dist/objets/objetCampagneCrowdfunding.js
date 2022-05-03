"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetCampagneCrowdfunding {
    constructor() {
        this.nom = "Campagne de crowd-funding";
        this.mois = state_1.Mois.MAI;
        this.point = 20;
        this.prix = 20;
    }
}
exports.default = ObjetCampagneCrowdfunding;
