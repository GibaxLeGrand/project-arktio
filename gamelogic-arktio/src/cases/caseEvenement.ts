import {Case, TypeReponse} from "../caseManager";
import {Mois, State} from "../state";

export default class CaseEvenement implements Case {
    name = "Évenement";
    id_name = "event";
    max_number = 1;

    play(state: State, playerID: string, choices: number[]) : State {
        state.joueurs[playerID].pointTerre += 10;
        return state;
    }

    getText(state: State) : string {
        switch(state.mois) {
            case Mois.SEPTEMBRE:
                return "Journée Mondiale du développement durable";
            case Mois.OCTOBRE:
                return "Journée Mondiale des animaux";
            case Mois.NOVEMBRE:
                return "Journée mondiale végane";
            case Mois.DECEMBRE:
                return "Marché de Noël / Marché off";
            case Mois.JANVIER:
                return "Liste bonnes résolutions écologiques";
            case Mois.FEVRIER:
                return "Saint Valentin et les fleurs";
            case Mois.MARS:
                return "Journée internationale de la lutte pour les droits des femmes";
            case Mois.AVRIL:
                return "Pâques et le chocolat";
            case Mois.MAI:
                return "Journée mondiale du commerce équitable";
            case Mois.JUIN:
                return "Journée mondiale de l'environnement";
            default:
                return "???";
        }
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        return { titre: "Aujourd'hui est un jour d'évènement !", messages: [this.getText(state)] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}