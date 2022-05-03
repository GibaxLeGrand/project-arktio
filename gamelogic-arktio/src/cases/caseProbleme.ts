import {Case, Choix} from "../caseManager";
import {State} from "../state";

export default class CaseProbleme implements Case {
    name = "Problème";
    id_name = "probleme";
    max_number = 2;

    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("probleme");
    }
}