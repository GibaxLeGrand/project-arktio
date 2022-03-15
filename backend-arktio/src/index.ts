import { Lobby } from './lobby';
import express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { Player } from './player';
import { LobbyState } from './lobby';
import * as core from 'express-serve-static-core';

declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

export class Index {
    private app: core.Express;
    private server: http.Server;
    private port;
    private io: Server;
    private lobbies: Map<string, Lobby>;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 8080;
        this.io = new Server(this.server);
        this.lobbies = new Map();
        this.setup();
    }

    private setup() : void {
        this.app.get('/lobbies', (req: core.Request, res: core.Response) => {
            res.send(Object.fromEntries(this.lobbies));
        });

        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });
        
        this.io.on("connection", (socket: Socket) => {
            console.log("Connected client on port %s", this.port);
        
            socket.on("player information", (uuid: string) => {
                let player : Player = new Player(uuid); // TODO: FIND IN DATABASE
        
                socket.removeAllListeners("player information");
        
                socket.on("lobby choice", (lobbyUUID: string, callback: ((message: boolean) => boolean)) => {
                    if (this.lobbies.has(lobbyUUID)) {
                        let lobby: Lobby | undefined = this.lobbies.get(lobbyUUID);
                        if (lobby?.getNumberOfPlayers() && lobby?.getNumberOfPlayers() < 4 
                                && lobby?.getState() && lobby?.getState() === LobbyState.Lobby) { 
                            lobby?.addPlayer(player, socket);
                            callback(true);
                        } else {
                            callback(false);
                        }
                    } else {
                        callback(false);
                    }
                });
            
                socket.on("lobby creation", (privacy: boolean, callback: ((message: string) => string)) => {
                    let lobbyUUID: string = crypto.randomUUID();
                    let lobby = new Lobby(lobbyUUID, this.io, privacy);
                    lobby.addPlayer(player, socket);
        
                    this.lobbies.set(lobbyUUID, lobby);
        
                    callback(lobbyUUID);
                });
            });
        });
    }



}







