"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetKitBiere {
    constructor() {
        this.nom = "Kit biere maison";
        this.mois = state_1.Mois.JUIN;
        this.point = -15;
        this.prix = 50;
    }
}
exports.default = ObjetKitBiere;
