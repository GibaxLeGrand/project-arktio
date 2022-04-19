import {Case, Choix} from "../caseManager";
import {State} from "../state";

export default class CaseInformation implements Case {
    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("information");
    }
}