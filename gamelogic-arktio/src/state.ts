import { Case } from "./caseManager";
import { Player } from "./player";
import { ObjetManager, Objet } from "./objetManager";

export class State {
    joueurs: {[key:string] : Player} = {};
    plateau: number[] = [];
    tour: number = 1;
    mois: number = 1;
    objets_par_mois: {[key:number] : number[]} = {};
    ordre_joueurs: string[];
    joueur_actuel: string;

    private constructor(joueurs: {[key:string] : Player}, plateau: number[], tour: number, mois: number, 
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
        let howMany: number = ObjetManager.howManyObjets();
        let objets_par_mois: {[key:number] : number[]} = {};
        
        for (let i=0; i<10; i++) 
            objets_par_mois[i] = [];

        let buffer: number[] = [];
        let sum = 0;
        while (sum < 10*3) {
            for (let i=0; i<howMany || sum < 10*3; i++) {
                let objet = Math.floor(Math.random() * howMany);
                
                if (buffer.indexOf(objet) >= 0)
                    continue;

                let mois = Math.floor(Math.random() * 10);
                while (objets_par_mois[mois].indexOf(objet) >= 0 || objets_par_mois[mois].length > sum%10) 
                    mois = Math.floor(Math.random() * 10);
                
                objets_par_mois[mois].push(objet);
                buffer.push(objet);
                sum += 1;
            }

            buffer = [];
        }

        return new State(joueurs, plateau, 1, 1, objets_par_mois, ordre_joueurs, ordre_joueurs[0]);
    }

    static createFrom(state: State): State {
        return new State(state.joueurs, state.plateau, state.tour, state.mois, 
            state.objets_par_mois, state.ordre_joueurs, state.joueur_actuel);
    }
}