import {Case, Choix, Information} from "../caseManager";
import { Objet } from "../objetManager";
import {State} from "../state";

class AchatsPossibles implements Information {

    private objets: Objet[] = [];

    constructor(objets: Objet[]) {
        this.objets = objets;
    }

    public message() : any {
        return {
            achats_possibles: this.objets
        }
    }

}

export default class CaseAchat implements Case {

    choiceOfPlayer(state: State, playerID: string) : Objet[] {
        let objetsDuMois = state.objets_par_mois[state.mois];
        let result: Objet[] = [];

        for (let i=0; i<objetsDuMois.length; i++) {
            state.joueurs[playerID].inventaire
        }

        return result;
    }

    play(state: State, playerID: string, choice: number) : State {
        let achatsPossibles = this.choiceOfPlayer(state, playerID);
        
        if (choice != -1) {
            let objet = achatsPossibles[choice];
            if (state.joueurs[playerID].argent < objet.prix) {
                return state;
            } else {
                state.joueurs[playerID].argent -= objet.prix;
                state.joueurs[playerID].pointTerre += objet.point;
                state.joueurs[playerID].inventaire.push(objet);
                return state;
            }
        } else {
            return state;   
        }
    }

    action(state : State, playerID: string) : Choix {       
        return new Choix("achat", new AchatsPossibles(this.choiceOfPlayer(State.createFrom(state), playerID)));
    }

}