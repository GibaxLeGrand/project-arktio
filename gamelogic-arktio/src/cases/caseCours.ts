import {Case, Choix, Information} from "../caseManager";
import { Objet } from "../objetManager";
import ObjetOrdinateur from "../objets/objetOrdinateur";
import {State} from "../state";

class Cours implements Information {

    private ordinateur: boolean;

    constructor(ordinateur: boolean) {
        this.ordinateur = ordinateur;
    }

    public message() : any {
        return {
            ordinateur: this.ordinateur
        }
    }
}

export default class CaseCours implements Case {
    play(state: State, playerID: string, choice: number) : State {
        if (choice === 0) {
            let caseActuelle: {position: number, type: number} = state.joueurs[playerID].caseActuelle;
            let position = Math.min(caseActuelle.position + 1, state.plateau.length-1);
            state.joueurs[playerID].caseActuelle = {
                position: position,
                type: state.plateau[position]
            }
        }

        return state;
    }

    action(state : State, playerID: string) : Choix {
        let st: State = State.createFrom(state);
        let inventaire: Objet[] = st.joueurs[playerID].inventaire;
        let ordinateur: boolean = false;

        for (let i=0; i<inventaire.length; i++) {
            if (inventaire[i] instanceof ObjetOrdinateur) {
                ordinateur = true;
                break;
            }
        }

        return new Choix("cours", new Cours(ordinateur));
    }
}