import { Player } from "./player";
export declare enum Mois {
    SEPTEMBRE = 0,
    OCTOBRE = 1,
    NOVEMBRE = 2,
    DECEMBRE = 3,
    JANVIER = 4,
    FEVRIER = 5,
    MARS = 6,
    AVRIL = 7,
    MAI = 8,
    JUIN = 9,
    COUNT = 10
}
export declare class State {
    joueurs: {
        [key: string]: Player;
    };
    plateau: number[];
    tour: number;
    mois: Mois;
    objets_par_mois: {
        [key: number]: number[];
    };
    ordre_joueurs: string[];
    joueur_actuel: string;
    private constructor();
    static create(joueurs: {
        [key: string]: Player;
    }, plateau: number[], ordre_joueurs: string[]): State;
    static createFrom(state: State): State;
}
