import {Case, Choix} from "../caseManager";
import {State} from "../state";

export default class CaseCourse implements Case {
    name = "Course";
    id_name = "course";
    max_number = 4;

    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        return new Choix("course");
    }
}