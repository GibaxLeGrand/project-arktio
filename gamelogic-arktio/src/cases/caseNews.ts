import {Case, TypeReponse} from "../caseManager";
import {State} from "../state";

export default class CaseNews implements Case {
    name = "News";
    id_name = "news";
    max_number = 2;

    

    play(state: State, playerID: string, choices: number[]) : State {
        return state;
    }

    getNews(state: State, playerID: string) {

    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        return { titre: "News!", messages: [""] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}