import CaseAchat from "./cases/caseAchat";
import CaseCours from "./cases/caseCours";
import CaseDimanche from "./cases/caseDimanche";
import CaseCourse from "./cases/caseCourse";
import CaseEngagement from "./cases/caseEngagement";
import CaseEvenement from "./cases/caseEvenement";
import CaseFacture from "./cases/caseFacture";
import CaseInformation from "./cases/caseInformation";
import CaseNews from "./cases/caseNews";
import CaseObjet from "./cases/caseObjet";
import CasePaie from "./cases/casePaie";
import CaseProbleme from "./cases/caseProbleme";
import CaseTroc from "./cases/caseTroc";
import type {State} from "./state";

export interface Case {
    play: (state: State, playerID: string, choices: number[]) => State;
    prepare: (state: State, playerID: string, step: number) => TypeReponse;
    next: (state: State, playerID: string, step: number, choice: number) => { end: boolean, step: number };
} 

export class TypeReponse {
    titre: string;
    messages: string[];

    constructor(titre: string, messages: string[]) {
        this.titre = titre;
        this.messages = messages;
    }
}

export class CaseManager {
        private static cases: { [key: number]: Case } = {};

        private static addCase(caseID: number, caseObj: Case) {
            console.log("Adding " + caseObj.constructor.name + " \t as ID " + caseID);
            CaseManager.cases[caseID] = caseObj;
        }

        static getCases(): { [key: number]: Case } {
            return CaseManager.cases;
        }

        static getCase(caseId: number): Case {
            return CaseManager.cases[caseId];
        }

        static initCases() {
            CaseManager.addCase(0, new CaseAchat());
            CaseManager.addCase(1, new CaseCours());
            CaseManager.addCase(2, new CaseCourse());
            CaseManager.addCase(3, new CaseDimanche());
            CaseManager.addCase(4, new CaseEngagement());
            CaseManager.addCase(5, new CaseEvenement());
            CaseManager.addCase(6, new CaseFacture());
            CaseManager.addCase(7, new CaseInformation());
            CaseManager.addCase(8, new CaseNews());
            CaseManager.addCase(9, new CaseObjet());
            CaseManager.addCase(10, new CasePaie());
            CaseManager.addCase(11, new CaseProbleme());
            CaseManager.addCase(12, new CaseTroc());
        }
    }