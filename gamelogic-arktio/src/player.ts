import { Objet } from "./objetManager"

export interface Player {
    id: string;
    nom: string;
    inventaire : Objet[];
    argent : number;
    pointTerre: number;
    pion : number;
    caseActuelle : number;
    statut : number;
    avertissement: number;
}