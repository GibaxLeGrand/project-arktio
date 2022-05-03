import {Case, CaseManager, TypeReponse} from "../caseManager";
import { Objet, ObjetManager } from "../objetManager";
import {State} from "../state";

export default class CaseAchat implements Case {
    play(state: State, playerID: string, choices: number[]) : State {
        return state;
    }

    write(objet: Objet) : string {


        return "";
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let s = State.createFrom(state);
        s.objets_par_mois[s.mois];
        
        
        return { titre: "Souhaitez-vous acheter un objet ?", messages: [] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}