import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

import { Player } from './player';
 
enum LobbyState {
    Lobby,
    Game,
    End
};

export class Lobby {
    private id: string;
    private players: Player[]; 
    private state: LobbyState;
    private server: http.Server;

    constructor(id: string, server: http.Server) {
        this.id = id;
        this.server = server;
        this.players = [];
        this.state = LobbyState.Lobby;
    }

    public getState() : LobbyState {
        return this.state;
    }

    public getPlayers() : Player[] {
        return this.players;
    }

    public getId() : string {
        return this.id;
    }

};