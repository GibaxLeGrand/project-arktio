import {Case, TypeReponse} from "../caseManager";
import {State} from "../state";

export default class CaseEngagement implements Case {
    id_name: string = "engagement";
    name: string = "Engagement";
    max_number = 1;

    play(state: State, playerID: string, choices: number[]) : State {
        state.joueurs[playerID].pointTerre += 20;
        state.joueurs[playerID].caseActuelle = Math.min(state.plateau.length-1, state.joueurs[playerID].caseActuelle + 5);
        
        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        return { titre: "Engagez vous !", messages: [
            "Engagement dans une association humanitaire / de justice sociale (Unicef, Amnesty international, etc)",
            "Engagement pour une action de préservation d'une population, espèce ou d'un milieu menacé (Greenpeace, SEa shepherd, etc)", 
            "Engagement dans un groupe d'action local (Zéro déchet Strasbourg, Alternatiba, etc)",
            "Se former à des modes de production alternatifs (Permaculture, Agroécologie, etc)" ] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}