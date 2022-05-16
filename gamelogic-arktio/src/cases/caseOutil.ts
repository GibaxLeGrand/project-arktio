import {Case, TypeReponse} from "../caseManager";
import {State, Mois} from "../state";
import {Objet, ObjetManager} from "../objetManager"

export default class CaseOutil implements Case {
    name = "Outil";
    id_name = "outil";
    max_number = 2;

    private bufferChoice: Map<string, Objet | null>;

    constructor() { 
        this.bufferChoice = new Map();
    }

    getRandomObjet(state: State, playerID: string, ...objets: Objet[]) : Objet | null {
        let inventaire : Objet[] = state.joueurs[playerID].inventaire;
        let available: Objet[] = objets.filter((objet: Objet) => {
            return inventaire.indexOf(objet) == -1;
        });
        
        if (available.length == 0) 
            return null;
        else 
            return available[Math.floor(Math.random() * available.length)];
    }

    getChoix(state: State, playerID: string) : Objet | null {
        switch(state.mois) {
            default:
                return this.getRandomObjet(state, playerID, ObjetManager.getObjet(30));
        }
    }

    play(state: State, playerID: string, choices: number[]) : State {
        let outil : Objet | null = this.bufferChoice.get(playerID)!;
        this.bufferChoice.delete(playerID);

        if (outil != null) {
            state.joueurs[playerID].inventaire.push(outil);
        }

        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let s: State = State.createFrom(state);
        let outil: Objet | null = this.getChoix(s, playerID);
        this.bufferChoice.set(playerID, outil);

        if (outil == null) 
            return { titre: "Vous n'avez rien trouvé", messages: ["Il ne se passe absolument rien"] };
        else 
            return { titre: "Vous avez trouvé un outil", messages: ["Tu viens de trouver un kit de réparation, il pourrait t'être utile en case problème par la suite"] };
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: false, step: 0 };
    }


    
}