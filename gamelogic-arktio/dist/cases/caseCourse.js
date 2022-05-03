"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caseManager_1 = require("../caseManager");
class CaseCourse {
    play(state, playerID, choice) {
        return state;
    }
    action(state, playerID) {
        return new caseManager_1.Choix("course");
    }
}
exports.default = CaseCourse;
