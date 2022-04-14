import {Case, Choix, Information} from "../caseManager";
import {State} from "../state";

abstract class Facture implements Information {
    nom: string;
    value: number;

    constructor(id: number, nom: string, value: number) {
        this.nom = nom;
        this.value = value;
    }

    message() : any {
        return {
            nom: this.nom,
            value: this.value
        }
    }
}

class Loyer extends Facture {
    constructor() {
        super("Loyer", 400);
    }
}

class Charges extends Facture {
    constructor() {
        super("Charges", 200);
    }
}

class FraisDeScolarité extends Facture {
    constructor() {
        super("Frais de Scolarité", 100);
    } 
}

export default class CaseFacture implements Case {

    private possibilities: Map<Facture, number> ;

    constructor() { 
        this.possibilities = new Map()
        this.possibilities.set(new Loyer(), 10);
        this.possibilities.set(new Charges(), 20);
        this.possibilities.set(new FraisDeScolarité(), 30); 
    }

    play(state: State, playerID: string, choice: number): State {
        let facture: Facture = Array.from(this.possibilities.entries())[choice][0];
        state.joueurs[playerID].argent -= facture.value;
        return state;
    }

    action(state: State, playerID: string): Choix {
        let st = State.createFrom(state);

        // Initialisation
        let chance = new Map(this.possibilities);
        if (st.mois !== 1) { // Septembre
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
        let choice: Facture = possibilities[0][0];
        for (let i = 0; i < possibilities.length; i++) {
            let element = possibilities[i]; 
            
            if (random < bsum + element[1]) {
                choice = element[0];
                break;
            }   

            bsum += element[1];
        }

        // Donner le choix 
        return new Choix('facture', choice);
    }
}
