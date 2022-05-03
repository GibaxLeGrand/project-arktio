"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const caseManager_1 = require("../caseManager");
const objetOrdinateur_1 = __importDefault(require("../objets/objetOrdinateur"));
const state_1 = require("../state");
class Cours {
    constructor(ordinateur) {
        this.ordinateur = ordinateur;
    }
    message() {
        return {
            ordinateur: this.ordinateur
        };
    }
}
class CaseCours {
    play(state, playerID, choice) {
        if (choice === 0) {
            let caseActuelle = state.joueurs[playerID].caseActuelle;
            let position = Math.min(caseActuelle.position + 1, state.plateau.length - 1);
            state.joueurs[playerID].caseActuelle = {
                position: position,
                type: state.plateau[position]
            };
        }
        return state;
    }
    action(state, playerID) {
        let st = state_1.State.createFrom(state);
        let inventaire = st.joueurs[playerID].inventaire;
        let ordinateur = false;
        for (let i = 0; i < inventaire.length; i++) {
            if (inventaire[i] instanceof objetOrdinateur_1.default) {
                ordinateur = true;
                break;
            }
        }
        return new caseManager_1.Choix("cours", new Cours(ordinateur));
    }
}
exports.default = CaseCours;
