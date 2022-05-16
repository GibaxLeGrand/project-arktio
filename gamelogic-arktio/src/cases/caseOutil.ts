import {Case, TypeReponse} from "../caseManager";
import {State} from "../state";
import {Objet, ObjetManager} from "../objetManager"



export default class CaseOutil implements Case {
    name = "Outil";
    id_name = "outil";
    max_number = 2;

    play(state: State, playerID: string, choices: number[]) : State {
        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let s: State = State.createFrom(state);
        let inventaire: Objet[] = s.joueurs[playerID].inventaire;
        let objets_du_mois: Objet[] = s.objets_par_mois[s.mois].map(idObj => ObjetManager.getObjet(idObj));
        let objets_a_presenter: Objet[];

        return { titre: "oui", messages: [] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: false, step: 0 };
    }


    
}