import {Case} from "./caseManager";
import {Player} from "./player";

export class State {
    joueurs: {[key:string] : Player} = {};
    plateau: number[] = [];
    tour: number = 1;
    mois: number = 1;

    private constructor(joueurs: {[key:string] : Player}, plateau: number[], tour: number, mois: number) {
        this.joueurs = joueurs;
        this.plateau = plateau;
        this.tour = tour;
        this.mois = mois;
    }

    static create(joueurs: {[key:string] : Player}, plateau: number[]): State {
        return new State(joueurs, plateau, 1, 1);
    }

    static createFrom(state: State): State {
        return new State(state.joueurs, state.plateau, state.tour, state.mois);
    }
}