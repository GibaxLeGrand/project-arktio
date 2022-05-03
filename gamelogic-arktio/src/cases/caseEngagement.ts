import {Case, TypeReponse} from "../caseManager";
import {State} from "../state";

export default class CaseEngagement implements Case {
    id_name: string = "engagement";
    name: string = "Engagement";
    max_number = 1;

    play(state: State, playerID: string, choices: number[]) : State {
        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        return { titre: "oui", messages: [] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: false, step: 0 };
    }
}