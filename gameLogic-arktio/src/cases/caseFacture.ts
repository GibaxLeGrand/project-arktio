import {Case} from "../caseManager";
import {State} from "../state";

interface Facture {
    nom: string,
    value: number
}

class Loyer implements Facture {
    nom: string = "Loyer";
    value: number = 400;
}

class Charges implements Facture {
    nom: string = "Charges";
    value: number = 200;
}

class FraisDeScolarité implements Facture {
    nom: string = "Frais de Scolarité";
    value: number = 100;
}

export default class CaseFacture implements Case {
    action(state: State, playerID: string): State {
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
        let choice : Facture;
        for (let i = 0; i < possibilities.length; i++) {
            let element = possibilities[i]; 
            
            if (random < bsum + element[1])
                choice = element[0];

            bsum += element[1];
        }

        // Faire l'action avec la bonne Facture

        return state;
    }
}
