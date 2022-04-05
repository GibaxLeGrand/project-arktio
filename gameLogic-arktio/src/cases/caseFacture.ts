import {Case} from "../caseManager";
import {State} from "../state";

export default class CaseFacture implements Case {
    action(state: State, playerID: string): State {
        return state;
    }
}
