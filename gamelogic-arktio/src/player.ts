import { Objet } from "./objetManager"

export interface Player {
    id: string;
    inventaire : Objet[];
    argent : number;
    pointTerre: number;
    pion : number;
    caseActuelle : {position: number, type: number};
    statut : number;
}