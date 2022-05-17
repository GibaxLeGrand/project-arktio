import {Case, TypeReponse} from "../caseManager";
import { Objet } from "../objetManager";
import ObjetOrdinateur from "../objets/objetOrdinateur";
import {State} from "../state";

export default class CaseCours implements Case {
    name = "Cours";
    id_name = "cours";
    max_number = 4;

    play(state: State, playerID: string, choices: number[]) : State {
        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let st: State = State.createFrom(state);
        let inventaire: Objet[] = st.joueurs[playerID].inventaire;
        let ordinateur: boolean = false;

        for (let i=0; i<inventaire.length; i++) {
            if (inventaire[i] instanceof ObjetOrdinateur) {
                ordinateur = true;
                break;
            }
        }

        return new TypeReponse("C'est un jour de cours aujourd'hui", [ordinateur ?
            "Tu vas en cours grâce à ton super ordinateur" : "Tu n'as pas le matériel nécessaire pour aller en cours"]);
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }

}