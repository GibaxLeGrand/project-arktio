"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetAnimal {
    constructor() {
        this.nom = "Parrainer un animal";
        this.mois = state_1.Mois.AVRIL;
        this.point = 0;
        this.prix = 15;
    }
}
exports.default = ObjetAnimal;
