

export interface Player {
    id: string;
    inventaire : Object[];
    argent : number;
    pointTerre: number;
    pion : number;
    caseActuelle : {position: number, type: number};
    statut : number;
}