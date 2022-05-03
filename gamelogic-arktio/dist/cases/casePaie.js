"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caseManager_1 = require("../caseManager");
class Paie {
    message() {
        return {
            value: 1000
        };
    }
}
class CasePaie {
    play(state, playerID, choice) {
        state.joueurs[playerID].argent += 1000;
        return state;
    }
    action(state, playerID) {
        return new caseManager_1.Choix("paie", new Paie());
    }
}
exports.default = CasePaie;
