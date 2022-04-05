import {Case} from "../caseManager";
import {State} from "../state";

export default class CasePaie implements Case {
    action(state : State, playerID: string) : State {
        // On ajoute $1000
        state.joueurs[playerID].argent += 1000;
        state.joueurs[playerID].statut = 0;
        state.joueurs[playerID].caseActuelle = {
            position: state.plateau.length,
            type: state.plateau[state.plateau.length - 1]
        };
        return state;
    }
}