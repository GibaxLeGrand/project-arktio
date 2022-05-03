import {Case, CaseManager, TypeReponse} from "../caseManager";
import { Objet } from "../objetManager";
import {State} from "../state";

class AchatsPossibles {

    private objets: Objet[] = [];

    constructor(objets: Objet[]) {
        this.objets = objets;
    }
}

export default class CaseAchat implements Case {
    play(state: State, playerID: string, choices: number[]) : State {
        let achatsPossibles = this.choiceOfPlayer(state, playerID);
        
        if (choices[0] != 0) {
            let objet = achatsPossibles[choices[0] - 1];
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

    write(objet: Objet) : string {
        return objet.nom + " / " + objet.prix + " euros / " + objet.point + " Point Terre";
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let s = State.createFrom(state);
        let choix = this.choiceOfPlayer(state, playerID);
        let messages = ["Ne rien acheter"]

        for (let i=0; i<choix.length; i++) {
            messages.push(this.write(choix[i]));
        }
        
        return { titre: "Souhaitez-vous acheter un objet ?", messages: messages };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }

    choiceOfPlayer(state: State, playerID: string) : Objet[] {
        let objetsDuMois = state.objets_par_mois[state.mois];
        let result: Objet[] = [];

        for (let i=0; i<objetsDuMois.length; i++) {
            state.joueurs[playerID].inventaire
        }

        return result;
    }

}