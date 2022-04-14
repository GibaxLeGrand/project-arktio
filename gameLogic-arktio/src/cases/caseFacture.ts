import {Case, Choix, Information} from "../caseManager";
import {State} from "../state";

class Facture implements Information {
    nom: string;
    value: number;

    constructor(nom: string, value: number) {
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
    play(state: State, playerID: string, choice: number): State {
        return state;
    }

    action(state: State, playerID: string): Choix {
        // Initialisation
        let chance : Map<Facture, number> = new Map();
        chance.set(new Loyer(), 10);
        chance.set(new Charges(), 20);
        
        if (state.mois === 1) // Septembre
            chance.set(new FraisDeScolarité(), 30);

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
