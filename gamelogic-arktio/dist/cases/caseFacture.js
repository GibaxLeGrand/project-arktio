"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caseManager_1 = require("../caseManager");
const state_1 = require("../state");
class Facture {
    constructor(nom, value) {
        this.nom = nom;
        this.value = value;
    }
    message() {
        return {
            nom: this.nom,
            value: this.value
        };
    }
}
class Loyer extends Facture {
    constructor() {
        super("Loyer", 400);
    }
}
class Charges extends Facture {
    constructor() {
        super("Charges", 200);
    }
}
class FraisDeScolarité extends Facture {
    constructor() {
        super("Frais de Scolarité", 100);
    }
}
class CaseFacture {
    constructor() {
        this.possibilities = new Map();
        this.possibilities.set(new Loyer(), 10);
        this.possibilities.set(new Charges(), 20);
        this.possibilities.set(new FraisDeScolarité(), 30);
    }
    play(state, playerID, choice) {
        let facture = Array.from(this.possibilities.entries())[choice][0];
        state.joueurs[playerID].argent -= facture.value;
        return state;
    }
    action(state, playerID) {
        let st = state_1.State.createFrom(state);
        // Initialisation
        let chance = new Map(this.possibilities);
        if (st.mois !== 6) { // Septembre
            for (let k of chance.keys()) {
                if (k instanceof FraisDeScolarité)
                    chance.delete(k);
            }
        }
        // Création de l'Aléatoire
        let sum = Array.from(chance.values()).reduce((s, x) => s + x, 0);
        let random = Math.floor(Math.random() * sum); // random over all chance
        // Choix de la bonne Facture
        let possibilities = Array.from(chance.entries());
        let bsum = 0;
        let choice = possibilities[0][0];
        for (let i = 0; i < possibilities.length; i++) {
            let element = possibilities[i];
            if (random < bsum + element[1]) {
                choice = element[0];
                break;
            }
            bsum += element[1];
        }
        // Donner le choix 
        return new caseManager_1.Choix('facture', choice);
    }
}
exports.default = CaseFacture;
