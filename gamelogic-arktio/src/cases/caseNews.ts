import {Case, Choix} from "../caseManager";
import {State} from "../state";

export default class CaseNews implements Case {
    name = "News";
    id_name = "news";
    max_number = 2;

    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("news");
    }
}