import {Case} from "../caseManager";
import {State} from "../state";

export default class CaseNews implements Case {
    action(state : State, playerID: string) : State {
        return state;
    }
}