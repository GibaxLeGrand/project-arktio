import CaseAchat from "./cases/caseAchat";
import CaseCours from "./cases/caseCours";
import CaseDimanche from "./cases/caseDimanche";
import CaseCourse from "./cases/caseCourse";
import CaseEngagement from "./cases/caseEngagement";
import CaseEvenement from "./cases/caseEvenement";
import CaseFacture from "./cases/caseFacture";
import CaseInformation from "./cases/caseInformation";
import CaseNews from "./cases/caseNews";
import CaseOutil from "./cases/caseOutil";
import CasePaie from "./cases/casePaie";
import CaseProbleme from "./cases/caseProbleme";
import CaseTroc from "./cases/caseTroc";
import type {State} from "./state";

export interface Case {
    name: string;
    id_name: string;
    max_number: number;
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

        public static generate_board() {
            // for each cases
            let allCase : Case[] = []
            for (let i = 0; i < Object.keys(this.cases).length; i++) {
                if (i == 3 || i == 10) continue;
                let c = this.cases[i];
                console.log(`addding ${c.max_number} ${c.name}`);
                for (let j = 0; j < c.max_number; j++) {
                    allCase.push(c);
                }
            }

            let board : Case[] = [];
            for (let i = 0; i < 30; i++) {
                if (i >= 6 && (i+1) % 7 == 0){
                    board.push(this.cases[3]);
                } else if (i == 29) {
                    board.push(this.cases[10]);
                } else {
                    let r = Math.floor(Math.random() * allCase.length);
                    board.push(allCase[r])
                    ;
                    allCase.splice(r, 1);
                }
                console.log(board[i].name);
            }
            return board;
        }

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
            CaseManager.addCase(9, new CaseOutil());
            CaseManager.addCase(10, new CasePaie());
            CaseManager.addCase(11, new CaseProbleme());
            CaseManager.addCase(12, new CaseTroc())
        }
    }