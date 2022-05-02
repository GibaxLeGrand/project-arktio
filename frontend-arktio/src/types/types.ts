export interface LobbyJSON {
    uuid: string,
    players: Array<PlayerJSON>,
    owner: PlayerJSON,
    state: LobbyState
}

export enum LobbyState {
    Lobby,
    Game,
    End
};

export interface PlayerJSON {
    uuid: string;
    name: string;
    token: number;
}

export interface Objet {
    nom: string;
    point: number;
    mois: Mois;
    prix: number;
}

export interface Player {
    id: string;
    inventaire : Objet[];
    argent : number;
    pointTerre: number;
    pion : number;
    caseActuelle : {position: number, type: number};
    statut : number;
    avertissement: number;
}


export enum Mois {
    SEPTEMBRE,
    OCTOBRE,
    NOVEMBRE,
    DECEMBRE,
    JANVIER,
    FEVRIER,
    MARS,
    AVRIL,
    MAI,
    JUIN,
    COUNT
}

export class State {
    joueurs: {[key:string] : Player} = {};
    plateau: number[] = [];
    tour: number = 1;
    mois: Mois = Mois.SEPTEMBRE;
    objets_par_mois: {[key:number] : number[]} = {};
    ordre_joueurs: string[];
    joueur_actuel: string;
}