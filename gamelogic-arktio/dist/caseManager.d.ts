import type { State } from "./state";
export interface Case {
    play: (state: State, playerID: string, choice: number) => State;
    action: (state: State, playerID: string) => Choix;
}
export declare class Choix {
    id: string;
    choix: Information[];
    constructor(id: string, ...choix: Information[]);
    message(): string;
}
export interface Information {
    message: () => any;
}
export declare class CaseManager {
    private static cases;
    private static addCase;
    static getCases(): {
        [key: number]: Case;
    };
    static getCase(caseId: number): Case;
    static initCases(): void;
}
