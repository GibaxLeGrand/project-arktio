import {Case, TypeReponse} from "../caseManager";
import {Mois, State} from "../state";

abstract class Facture {
    nom: string;
    value: number;

    constructor(nom: string, value: number) {
        this.nom = nom;
        this.value = value;
    }

}

class Loyer extends Facture {
    constructor() {
        super("votre loyer", 400);
    }
}

class Charges extends Facture {
    constructor() {
        super("vos charges", 200);
    }
}

class FraisDeScolarité extends Facture {
    constructor() {
        super("vos frais de Scolarité", 100);
    } 
}

export default class CaseFacture implements Case {
    name = "Facture";
    id_name = "facture";
    max_number = 1;

    private static possibilities: Map<Facture, number> = new Map();
    private static bufferChoice: Map<string, number> = new Map();

    static { 
        CaseFacture.possibilities.set(new Loyer(), 10);
        CaseFacture.possibilities.set(new Charges(), 20);
        CaseFacture.possibilities.set(new FraisDeScolarité(), 30);
    }

    play(state: State, playerID: string, choices: number[]) : State {
        let facture: Facture = Array.from(CaseFacture.possibilities.keys())[CaseFacture.bufferChoice.get(playerID)!];
        state.joueurs[playerID].argent -= facture.value;
        CaseFacture.bufferChoice.delete(playerID);
        return state;
    }

    prepare(state: State, playerID: string, step: number) : TypeReponse {
        let st = State.createFrom(state);

        // Initialisation
        let chance = new Map(CaseFacture.possibilities);
        if (st.mois !== Mois.SEPTEMBRE) { // Septembre
            for (let k of chance.keys()) {
                if (k instanceof FraisDeScolarité) 
                    chance.delete(k);
            }
        }

        // Création de l'Aléatoire
        let sum : number = Array.from(chance.values()).reduce((s, x) => s + x, 0);
        let random : number = Math.floor(Math.random() * sum); // random over all chance

        // Choix de la bonne Facture
        let possibilities : [Facture, number][] = Array.from(chance.entries());
        let bsum = 0;
        let choice = 0;
        for (let i = 0; i < possibilities.length; i++) {
            let element = possibilities[i]; 
            
            if (random < bsum + element[1]) {
                choice = i;
                break;
            }   

            bsum += element[1];
        }

        CaseFacture.bufferChoice.set(playerID, choice)
        return new TypeReponse("Payez votre Facture", ["Vous devez payer " 
            + possibilities[choice][0].nom + " d'un montant de " + possibilities[choice][0].value + " euros"]);
    }

    next(state: State, playerID: string, step: number, choice: number) : { end: boolean, step: number } {
        return { end: true, step: -1 };
    }
}
