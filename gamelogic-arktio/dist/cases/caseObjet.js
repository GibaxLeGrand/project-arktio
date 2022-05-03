"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caseManager_1 = require("../caseManager");
const state_1 = require("../state");
const objetManager_1 = require("../objetManager");
class CaseObjet {
    play(state, playerID, choice) {
        return state;
    }
    action(state, playerID) {
        let s = state_1.State.createFrom(state);
        let inventaire = s.joueurs[playerID].inventaire;
        let objets_du_mois = s.objets_par_mois[s.mois].map(idObj => objetManager_1.ObjetManager.getObjet(idObj));
        let objets_a_presenter;
        return new caseManager_1.Choix("objet");
    }
}
exports.default = CaseObjet;
