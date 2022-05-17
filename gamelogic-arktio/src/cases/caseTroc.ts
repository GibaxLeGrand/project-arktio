import {Case, TypeReponse} from "../caseManager";
import { Objet } from "../objetManager";
import {State} from "../state";

export default class CaseTroc implements Case {
    name = "Troc";
    id_name = "troc";
    max_number = 2;

    private static bufferPlayerChoice: Map<string, string> = new Map();
    private static bufferPlayerPageChoice: Map<string, number> = new Map();
    private static bufferSelfPageChoice: Map<string, number> = new Map();

    play(state: State, playerID: string, choices: number[]) : State {
        if (choices.length === 1) {
            return state;
        }

        let player: string = CaseTroc.bufferPlayerChoice.get(playerID)!;
        let ppage: number = CaseTroc.bufferPlayerPageChoice.get(playerID)!;
        let spage: number = CaseTroc.bufferSelfPageChoice.get(playerID)!;

        let ptroc: Objet = state.joueurs[player].inventaire.splice(ppage * 2 + choices[1] - 1, 1)[0];
        let stroc: Objet = state.joueurs[playerID].inventaire.splice(spage * 2 + choices[2] - 1, 1)[0];

        state.joueurs[player].inventaire.push(stroc);
        state.joueurs[playerID].inventaire.push(ptroc);

        CaseTroc.bufferPlayerPageChoice.delete(playerID);
        CaseTroc.bufferPlayerChoice.delete(playerID);
        CaseTroc.bufferSelfPageChoice.delete(playerID);

        return state;
    }

    getTrocablePlayers(state: State, playerID: string): string[] {
        let result: string[] = [];

        state.ordre_joueurs.forEach(player => {
            if (player !== playerID) {
                result.push(player);
            }
        })

        return result;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        switch (step) {
            case 0: {
                let messages: string[] = ["Je veux pas!"];
                console.log(this.getTrocablePlayers(state, playerID));
                console.log(state.joueurs);
                this.getTrocablePlayers(state, playerID).forEach(player => {
                    console.log(state.joueurs[player].nom);
                    messages.push(state.joueurs[player].nom);
                });

                return { titre: "Avec qui souhaitez-vous troquer ?", messages: messages };
            }
            case 1: {
                let messages: string[] = ["Retour"];
                let page: number = 0;
                let player: string = CaseTroc.bufferPlayerChoice.get(playerID)!;

                if (CaseTroc.bufferPlayerPageChoice.get(playerID) !== undefined) {
                    page = CaseTroc.bufferPlayerPageChoice.get(playerID)! + 1;
                } 

                CaseTroc.bufferPlayerPageChoice.set(playerID, page);

                for (let i=page*2; i<state.joueurs[player].inventaire.length && i<(page+1)*2; i++) {
                    messages.push(state.joueurs[player].inventaire[i].nom);
                }

                if (2 * (page + 1) < state.joueurs[player].inventaire.length) {
                    messages.push("Suivant");
                }                

                return { titre: `Choississez l'objet que vous voulez troquez de ${state.joueurs[player].nom}`, messages: messages};
            }
            case 2: {
                let messages: string[] = ["Retour"];
                let page: number = 0;

                if (CaseTroc.bufferSelfPageChoice.get(playerID) !== undefined) {
                    page = CaseTroc.bufferSelfPageChoice.get(playerID)! + 1;
                } 

                CaseTroc.bufferSelfPageChoice.set(playerID, page);

                for (let i=page*2; i<state.joueurs[playerID].inventaire.length && i<(page+1)*2; i++) {
                    messages.push(state.joueurs[playerID].inventaire[i].nom);
                }

                if (2 * (page + 1) < state.joueurs[playerID].inventaire.length) {
                    messages.push("Suivant");
                }                

                return { titre: `Choississez l'objet que vous voulez troquez à ${state.joueurs[CaseTroc.bufferPlayerChoice.get(playerID)!].nom}`, messages: messages};
            }
            default:
                return { titre: "???", messages: [""] };
        }
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        switch (step) {
            case 0:
                if (choice === 0) {
                    return { end: true, step: -1 };
                } else {
                    CaseTroc.bufferPlayerChoice.set(playerID, this.getTrocablePlayers(state, playerID)[choice - 1]);
                    return { end: false, step: 1 };
                }
            case 1: {
                if (choice === 0) {
                    CaseTroc.bufferPlayerPageChoice.delete(playerID);
                    CaseTroc.bufferPlayerChoice.delete(playerID);
                    return { end: false, step: 0 };
                } else if (choice === 3) {
                    return { end: false, step: 1 };
                } else {
                    return { end: false, step: 2 };
                }
            }
            case 2: {
                if (choice === 0) {
                    CaseTroc.bufferPlayerPageChoice.delete(playerID);
                    CaseTroc.bufferPlayerChoice.delete(playerID);
                    CaseTroc.bufferSelfPageChoice.delete(playerID);
                    return { end: false, step: 0 };
                } else if (choice === 3) {
                    return { end: false, step: 2 };
                } else {
                    return { end: true, step: -1 };
                }
            }
            default: 
                // ???
                return { end: true, step: -1 };
        }        
    }
}