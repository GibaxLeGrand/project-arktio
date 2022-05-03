import { Case, Choix } from "../caseManager";
import { Objet } from "../objetManager";
import { State } from "../state";
export default class CaseAchat implements Case {
    choiceOfPlayer(state: State, playerID: string): Objet[];
    play(state: State, playerID: string, choice: number): State;
    action(state: State, playerID: string): Choix;
}
