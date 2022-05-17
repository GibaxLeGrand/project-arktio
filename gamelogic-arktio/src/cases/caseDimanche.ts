import {Case, TypeReponse} from "../caseManager";
import { ObjetManager } from "../objetManager";
import {Mois, State} from "../state";

export default class CaseDimanche implements Case {
    name = "Dimanche";
    id_name = "dimanche";
    max_number = 4;

    private static noEffectAction: string[] = [];

    static {
        CaseDimanche.noEffectAction.push("Promenade en pleine nature");
        CaseDimanche.noEffectAction.push("Jeux de société en famille / entre amis");
        CaseDimanche.noEffectAction.push("Détente / Lecture / Film");
        CaseDimanche.noEffectAction.push("Découverte d'une nouvelle activité en famille / entre amis");      
    }

    play(state: State, playerID: string, choices: number[]) : State {
        if (choices[0] === 0)
            return state;
        
        switch (state.mois) {
            case Mois.SEPTEMBRE:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(19)) !== -1 && choices[0] === 1) {
                    state.joueurs[playerID].inventaire.splice(state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(19)), 1);
                    state.joueurs[playerID].pointTerre += 5;
                }
                break;
            case Mois.DECEMBRE:
                let choice = 1;

                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(28)) !== -1 && choices[0] === choice++) {
                    state.joueurs[playerID].inventaire.splice(state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(28)), 1);
                    state.joueurs[playerID].pointTerre += 5;
                    break;
                }

                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(29)) !== -1 && choices[0] === choice) {
                    state.joueurs[playerID].inventaire.splice(state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(29)), 1);
                    state.joueurs[playerID].pointTerre += 10;
                }

                break;
            case Mois.FEVRIER:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(3)) !== -1 && choices[0] === 1) {
                    state.joueurs[playerID].inventaire.splice(state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(3)), 1);
                    state.joueurs[playerID].pointTerre += 10;
                }
                break;
            case Mois.AVRIL:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(9)) !== -1 && choices[0] === 1) {
                    state.joueurs[playerID].inventaire.splice(state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(9)), 1);
                    state.joueurs[playerID].pointTerre += 15;
                }

                break;
            default:
                break;
        }

        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let messages: string[] = [];
        messages.push(CaseDimanche.noEffectAction[Math.floor(Math.random() * CaseDimanche.noEffectAction.length)]);
    
        switch (state.mois) {
            case Mois.SEPTEMBRE:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(19)) !== -1) {
                    messages.push("Rien de tel qu'un bon film pour s'évader l'esprit… C'est moment d'utiliser ton abonnement cinéma engagé pour découvrir des initiatives, des luttes inspirant.e.s ! Quelques idées par ici : https://www.imagotv.fr/ (Gagnez 5 Points Terre)");
                }
                break;
            case Mois.DECEMBRE:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(28)) !== -1) {
                    messages.push("Après-midi au club de lecture pour partager tes dernières découvertes ! Ce sera également l'occasion de sensibiliser les membres à l'achat de livres d'occasion. Après tout, un objet qui a vécu n'a que plus de valeur ! (Gagnez 5 Points Terre)");
                }

                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(29)) !== -1) {
                    messages.push("Ca y est c'est les vacances ! Après des semaines d'organisation, c'est le moment de profiter de la neige et des forêts vosgiennes pour une pause bien méritée ! (Gagnez 10 Points Terre)");
                }

                break;
            case Mois.FEVRIER:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(3)) !== -1) {
                    messages.push("Au coeur de l'hiver, on adore parler des heures aux proches qu'on ne voit malheureusement pas assez ! C'est l'occasion de leur expliquer combien ton nouveau téléphone a une empreinte carbone limitée. Attention néanmoins à ne pas abuser tes appels vidéo ! (Gagnez 10 Points Terre)");
                }
                break;
            case Mois.AVRIL:
                if (state.joueurs[playerID].inventaire.indexOf(ObjetManager.getObjet(9)) !== -1) {
                    messages.push("Aujourd'hui, c'est ton rendez-vous avec ton animal-filleul ! L'occasion de lui donner l'affection dont il a besoin et d'aider les bénévoles du refuge ! (Gagnez 15 Points Terre)");
                }

                break;
            default:
                break;
        }

        return { titre: "Dimanche pour soi", messages: messages };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}