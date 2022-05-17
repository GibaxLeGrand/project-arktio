import {Case, TypeReponse} from "../caseManager";
import { ObjetManager } from "../objetManager";
import {State} from "../state";

export default class CaseCourse implements Case {
    name = "Course";
    id_name = "course";
    max_number = 4;

    getSpecialityPoint(state: State, playerID: string) : number {
        let result = 20;
        let inventaire = state.joueurs[playerID].inventaire;

        const index = inventaire.indexOf(ObjetManager.getObjet(25));
        if (index > -1) {
            result += 15;
        }

        return result;
    } 

    play(state: State, playerID: string, choices: number[]) : State {
        switch (choices[0]) {
            case 1:
                state.joueurs[playerID].argent -= 45;
                state.joueurs[playerID].pointTerre += this.getSpecialityPoint(state, playerID);

                let inventaire = state.joueurs[playerID].inventaire;
                const index = inventaire.indexOf(ObjetManager.getObjet(25));
                if (index > -1) {
                    inventaire.splice(index, 1);
                }

                break;

            case 0:
            default:
                state.joueurs[playerID].argent -= 30;
                state.joueurs[playerID].pointTerre -= 20;
                break;
        }

        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        return { titre: "Jour de course", messages: ["Magasin conventionnel: -20 points Terre / 30 euros",
             "Magasin spécialisé: " + this.getSpecialityPoint(state, playerID) + " points Terre / 45 euros"] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}