import {Case, CaseManager, TypeReponse} from "../caseManager";
import { Objet, ObjetManager } from "../objetManager";
import {State} from "../state";

export default class CaseAchat implements Case {
    name = "Achat";
    id_name = "achat";
    max_number = 3;

    play(state: State, playerID: string, choices: number[]) : State {
        let achatsPossibles = this.choiceOfPlayer(state, playerID);
        
        if (choices[0] != 0 || achatsPossibles.length >= choices[0]) {
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
            if (ObjetManager.getObjet(objetsDuMois[i]).prix > state.joueurs[playerID].argent) {
                continue;
            }

            let own = false;
            for (let j=0; i<state.joueurs[playerID].inventaire.length; j++) {
                if (state.joueurs[playerID].inventaire[j] === ObjetManager.getObjet(objetsDuMois[i])) {
                   own = true;
                   break;
                }
            }

            if (!own) {
                result.push(ObjetManager.getObjet(objetsDuMois[i]));
            }
        }

        return result;
    }

}