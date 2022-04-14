import {Case, Choix, Information} from "../caseManager";
import {State} from "../state";

class Paie implements Information {
    public message() : any {
        return {
            value: 1000
        }
    }
}

export default class CasePaie implements Case {
    play(state: State, playerID: string, choice: number) : State {
        state.joueurs[playerID].argent += 1000;
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("paie", new Paie());
    }

    
}