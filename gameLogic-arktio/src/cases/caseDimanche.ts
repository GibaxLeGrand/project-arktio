import {Case} from "../caseManager";
import {State} from "../state";

export default class CaseDimanche implements Case {
    action(state : State, playerID: string) : State {
        return state;
    }
}