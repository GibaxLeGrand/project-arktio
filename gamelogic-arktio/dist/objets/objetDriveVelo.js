"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../state");
class ObjetDriveVelo {
    constructor() {
        this.nom = "Souscription drive à Vélo";
        this.mois = state_1.Mois.MARS;
        this.point = 0;
        this.prix = 40;
    }
}
exports.default = ObjetDriveVelo;
