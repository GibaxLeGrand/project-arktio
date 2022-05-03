import {Case, Choix} from "../caseManager";
import {State} from "../state";

export default class CaseEvenement implements Case {
    name = "Évenement";
    id_name = "event";
    max_number = 1;

    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("evenement");
    }
}