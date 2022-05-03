"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Mois = void 0;
var Mois;
(function (Mois) {
    Mois[Mois["SEPTEMBRE"] = 0] = "SEPTEMBRE";
    Mois[Mois["OCTOBRE"] = 1] = "OCTOBRE";
    Mois[Mois["NOVEMBRE"] = 2] = "NOVEMBRE";
    Mois[Mois["DECEMBRE"] = 3] = "DECEMBRE";
    Mois[Mois["JANVIER"] = 4] = "JANVIER";
    Mois[Mois["FEVRIER"] = 5] = "FEVRIER";
    Mois[Mois["MARS"] = 6] = "MARS";
    Mois[Mois["AVRIL"] = 7] = "AVRIL";
    Mois[Mois["MAI"] = 8] = "MAI";
    Mois[Mois["JUIN"] = 9] = "JUIN";
    Mois[Mois["COUNT"] = 10] = "COUNT";
})(Mois = exports.Mois || (exports.Mois = {}));
class State {
    constructor(joueurs, plateau, tour, mois, objets_par_mois, ordre_joueurs, joueur_actuel) {
        this.joueurs = {};
        this.plateau = [];
        this.tour = 1;
        this.mois = Mois.SEPTEMBRE;
        this.objets_par_mois = {};
        this.joueurs = joueurs;
        this.plateau = plateau;
        this.tour = tour;
        this.mois = mois;
        this.objets_par_mois = objets_par_mois;
        this.ordre_joueurs = ordre_joueurs;
        this.joueur_actuel = joueur_actuel;
    }
    static create(joueurs, plateau, ordre_joueurs) {
        // Initialisation tableaux des objets
        let objets_par_mois = {};
        for (let i = 0; i < 10; i++)
            objets_par_mois[i] = [];
        let buffer = [];
        let sum = 0;
        for (let i = 0; i < Mois.COUNT; i++) {
            for (let j = 0; j < 3; j++) {
                objets_par_mois[i].push(i * 3 + j);
            }
        }
        return new State(joueurs, plateau, 1, 1, objets_par_mois, ordre_joueurs, ordre_joueurs[0]);
    }
    static createFrom(state) {
        return new State(state.joueurs, state.plateau, state.tour, state.mois, state.objets_par_mois, state.ordre_joueurs, state.joueur_actuel);
    }
}
exports.State = State;
