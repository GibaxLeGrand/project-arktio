"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caseManager_1 = require("../caseManager");
const state_1 = require("../state");
class AchatsPossibles {
    constructor(objets) {
        this.objets = [];
        this.objets = objets;
    }
    message() {
        return {
            achats_possibles: this.objets
        };
    }
}
class CaseAchat {
    choiceOfPlayer(state, playerID) {
        let objetsDuMois = state.objets_par_mois[state.mois];
        let result = [];
        for (let i = 0; i < objetsDuMois.length; i++) {
            state.joueurs[playerID].inventaire;
        }
        return result;
    }
    play(state, playerID, choice) {
        let achatsPossibles = this.choiceOfPlayer(state, playerID);
        if (choice != -1) {
            let objet = achatsPossibles[choice];
            if (state.joueurs[playerID].argent < objet.prix) {
                return state;
            }
            else {
                state.joueurs[playerID].argent -= objet.prix;
                state.joueurs[playerID].pointTerre += objet.point;
                state.joueurs[playerID].inventaire.push(objet);
                return state;
            }
        }
        else {
            return state;
        }
    }
    action(state, playerID) {
        return new caseManager_1.Choix("achat", new AchatsPossibles(this.choiceOfPlayer(state_1.State.createFrom(state), playerID)));
    }
}
exports.default = CaseAchat;
