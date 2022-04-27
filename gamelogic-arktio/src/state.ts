import { Case } from "./caseManager";
import { Player } from "./player";
import { ObjetManager, Objet } from "./objetManager";


export enum Mois {
    SEPTEMBRE,
    OCTOBRE,
    NOVEMBRE,
    DECEMBRE,
    JANVIER,
    FEVRIER,
    MARS,
    AVRIL,
    MAI,
    JUIN,
    COUNT
}

export class State {
    joueurs: {[key:string] : Player} = {};
    plateau: number[] = [];
    tour: number = 1;
    mois: Mois = Mois.SEPTEMBRE;
    objets_par_mois: {[key:number] : number[]} = {};
    ordre_joueurs: string[];
    joueur_actuel: string;

    private constructor(joueurs: {[key:string] : Player}, plateau: number[], tour: number, mois: Mois,
        objets_par_mois: {[key:number] : number[]}, ordre_joueurs: string[], joueur_actuel: string) {
        this.joueurs = joueurs;
        this.plateau = plateau;
        this.tour = tour;
        this.mois = mois;
        this.objets_par_mois = objets_par_mois;
        this.ordre_joueurs = ordre_joueurs;
        this.joueur_actuel = joueur_actuel;
    }

    static create(joueurs: {[key:string] : Player}, plateau: number[], ordre_joueurs: string[]): State {

        // Initialisation tableaux des objets
        let objets_par_mois: {[key:number] : number[]} = {};
        
        for (let i=0; i<10; i++) 
            objets_par_mois[i] = [];

        let buffer: number[] = [];
        let sum = 0;
        for (let i = 0; i <Mois.COUNT; i++) {
            for (let j = 0; j < 3; j++) {
                objets_par_mois[i].push(i*3+j);
            }
        }

        return new State(joueurs, plateau, 1, 1, objets_par_mois, ordre_joueurs, ordre_joueurs[0]);
    }

    static createFrom(state: State): State {
        return new State(state.joueurs, state.plateau, state.tour, state.mois, 
            state.objets_par_mois, state.ordre_joueurs, state.joueur_actuel);
    }
}