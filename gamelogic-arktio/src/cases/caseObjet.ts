import {Case, Choix} from "../caseManager";
import {State} from "../state";
import {Objet, ObjetManager} from "../objetManager"



export default class CaseObjet implements Case {

    play(state: State, playerID: string, choice: number) : State {
        return state;
    }

    action(state : State, playerID: string) : Choix {
        let s: State = State.createFrom(state);
        let inventaire: Objet[] = s.joueurs[playerID].inventaire;
        let objets_du_mois: Objet[] = s.objets_par_mois[s.mois].map(idObj => ObjetManager.getObjet(idObj));
        let objets_a_presenter: Objet[];

        return new Choix("objet");
    }
}