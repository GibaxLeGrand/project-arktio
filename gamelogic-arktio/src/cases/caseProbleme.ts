import {Case, TypeReponse} from "../caseManager";
import { ObjetManager } from "../objetManager";
import {State} from "../state";

export default class CaseProbleme implements Case {
    name = "Problème";
    id_name = "probleme";
    max_number = 2;

    private static problemes: string[] = [];

    static {
        CaseProbleme.problemes.push("Clavier d'ordinateur défaillant");
        CaseProbleme.problemes.push("Aspirateur en panne");
        CaseProbleme.problemes.push("Meuble abîmé");
        CaseProbleme.problemes.push("Four en panne");
        CaseProbleme.problemes.push("Ecran de téléphone fissuré");
        CaseProbleme.problemes.push("Vêtement troué");
        CaseProbleme.problemes.push("Panne de frigo");
        CaseProbleme.problemes.push("Batterie de téléphone défaillante");
        CaseProbleme.problemes.push("Ordinateur trop lent");
        CaseProbleme.problemes.push("Pneu de vélo crevé");
        CaseProbleme.problemes.push("Trotinette endommagée");
        CaseProbleme.problemes.push("Panne de machine à laver");
        CaseProbleme.problemes.push("Panne de radiateur");
        CaseProbleme.problemes.push("Vélo endommagé");
    }

    play(state: State, playerID: string, choices: number[]) : State {
        switch(choices[0]) {
            case 0:
                state.joueurs[playerID].argent -= 50;
                state.joueurs[playerID].pointTerre += 10;
                break;
            case 2: 
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(30)) !== -1) {
                    state.joueurs[playerID].argent -= 100;
                    state.joueurs[playerID].pointTerre += 20;
                    state.joueurs[playerID].inventaire.splice(state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(30)), 1);
                    break;
                }
            case 1:
                state.joueurs[playerID].pointTerre -= 15;
                break;
        }

        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let messages: string[] = [];

        messages.push("Tout n'est malheureusement pas réparable mais il est toujours possible de récupérer les pièces d'objets défectueux pour en réparer d'autres. Rien ne se perd ! Tu trouves même un objet d'occasion pour remplacer celui qui ne marchait plus. Verser 50€ pour gagner 10 Points Terre");
        messages.push("S'il ne fonctionne plus, autant t'offrir quelque chose de mieux ou de plus performant. Jetez l'objet et perdez 100€ et 15 Points Terre");

        if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(30)) !== -1) {
            messages.push("Apprend à réparer tes objets grâce aux bénévoles du Repair Café. Une option à moindre coût avec un peu de matériel et tu sauras peut-être le faire toi-même la prochaine fois ! Coûte un kit de réparation et fait gagner 20 Point Terre");
        }

        return { titre: CaseProbleme.problemes[Math.floor(Math.random() * CaseProbleme.problemes.length)], messages: messages };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}