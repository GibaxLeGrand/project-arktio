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


export interface Case {
    name: string;
    id_name: string;
}

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

const listemois : string[] = [
    "de Septembre",
    "d'Octobre",
    "de Novembre",
    "de Décembre",
    "de Janvier",
    "de Février",
    "de Mars",
    "d'Avril",
    "de Mai",
    "de Juin"
];

export function getMois(mois : Mois) : string {
    return listemois[mois];
}

export class State {
    joueurs: {[key:string] : Player} = {};
    plateau: Case[] = [];
    tour: number = 1;
    mois: Mois = Mois.SEPTEMBRE;
    objets_par_mois: {[key:number] : number[]} = {};
    ordre_joueurs: string[];
    joueur_actuel: string;
}

export class TypeReponse {
    titre: string;
    messages: string[];
}