import { Case, Choix } from "../caseManager";
import { State } from "../state";
export default class CasePaie implements Case {
    play(state: State, playerID: string, choice: number): State;
    action(state: State, playerID: string): Choix;
}
