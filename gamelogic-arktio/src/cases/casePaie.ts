import {Case, TypeReponse,} from "../caseManager";
import {State} from "../state";

export default class CasePaie implements Case {
    name = "Paie";
    id_name = "paie";
    max_number = 1;

    play(state: State, playerID: string, choices: number[]) : State {
        state.joueurs[playerID].argent += 1000;
        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        return { titre: "Jour de Paie", messages: ["Tu gagnes " + 1000 + " euros!"] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }

}