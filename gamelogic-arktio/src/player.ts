import { Objet } from "./objetManager"

export interface Player {
    id: string;
    inventaire : Objet[];
    argent : number;
    pointTerre: number;
    pion : number;
    caseActuelle : number;
    statut : number;
    avertissement: number;
}