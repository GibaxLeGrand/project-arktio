"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseManager = exports.Choix = void 0;
const caseAchat_1 = __importDefault(require("./cases/caseAchat"));
const caseCours_1 = __importDefault(require("./cases/caseCours"));
const caseDimanche_1 = __importDefault(require("./cases/caseDimanche"));
const caseCourse_1 = __importDefault(require("./cases/caseCourse"));
const caseEngagement_1 = __importDefault(require("./cases/caseEngagement"));
const caseEvenement_1 = __importDefault(require("./cases/caseEvenement"));
const caseFacture_1 = __importDefault(require("./cases/caseFacture"));
const caseInformation_1 = __importDefault(require("./cases/caseInformation"));
const caseNews_1 = __importDefault(require("./cases/caseNews"));
const caseObjet_1 = __importDefault(require("./cases/caseObjet"));
const casePaie_1 = __importDefault(require("./cases/casePaie"));
const caseProbleme_1 = __importDefault(require("./cases/caseProbleme"));
const caseTroc_1 = __importDefault(require("./cases/caseTroc"));
class Choix {
    constructor(id, ...choix) {
        this.id = id;
        this.choix = choix;
    }
    message() {
        return JSON.stringify({ id: this.id, info: this.choix.map(c => c.message()) });
    }
}
exports.Choix = Choix;
class CaseManager {
    static addCase(caseID, caseObj) {
        console.log("Adding " + caseObj.constructor.name + " \t as ID " + caseID);
        CaseManager.cases[caseID] = caseObj;
    }
    static getCases() {
        return CaseManager.cases;
    }
    static getCase(caseId) {
        return CaseManager.cases[caseId];
    }
    static initCases() {
        CaseManager.addCase(0, new caseAchat_1.default());
        CaseManager.addCase(1, new caseCours_1.default());
        CaseManager.addCase(2, new caseCourse_1.default());
        CaseManager.addCase(3, new caseDimanche_1.default());
        CaseManager.addCase(4, new caseEngagement_1.default());
        CaseManager.addCase(5, new caseEvenement_1.default());
        CaseManager.addCase(6, new caseFacture_1.default());
        CaseManager.addCase(7, new caseInformation_1.default());
        CaseManager.addCase(8, new caseNews_1.default());
        CaseManager.addCase(9, new caseObjet_1.default());
        CaseManager.addCase(10, new casePaie_1.default());
        CaseManager.addCase(11, new caseProbleme_1.default());
        CaseManager.addCase(12, new caseTroc_1.default());
    }
}
exports.CaseManager = CaseManager;
CaseManager.cases = {};
