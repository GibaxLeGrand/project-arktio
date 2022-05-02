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