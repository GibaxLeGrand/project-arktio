import {Case, Choix} from "../caseManager";
import {State} from "../state";

export default class CaseEngagement implements Case {
    id_name: string = "engagement";
    name: string = "Engagement";
    max_number = 1;

    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("engagement");
    }
}