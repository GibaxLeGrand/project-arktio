import { Server, Socket } from 'socket.io';
import { LobbyPlayer } from './player';
import { Lobby, LobbyJSON } from './lobby';
import * as http from 'http';

declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

export class LobbyManager {
    private io: Server;
    private lobbies: Map<string, Lobby>;
    private port: string | number;

    constructor(server: http.Server, port: string | number) {
        this.io = new Server(server);
        this.lobbies = new Map();
        this.port = port;
        this.setup();
    }

    private setup() : void {
        this.io.on("connection", (socket: Socket) => {
            console.log("Connected client on port %s", this.port);
        
            socket.on("player information", (uuid: string, callback: ({ player } : { player: LobbyPlayer }) => void) => {
                let player: LobbyPlayer = new LobbyPlayer(uuid); // TODO: FIND IN DATABASE
        
                socket.removeAllListeners("player information");

                socket.on("create lobby", (callback: (({ lobby } : { lobby: LobbyJSON }) => void)) => {
                    let lobbyUUID: string = crypto.randomUUID();
                    let lobby: Lobby = new Lobby(lobbyUUID, this.io, true);
                    this.lobbies.set(lobbyUUID, lobby);
                    
                    lobby.addPlayer(player, socket);
                    callback({ lobby: lobby.toJSON() });
                })

                socket.on("join lobby", (lobbyUUID: string, callback: (({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => void)) => {                    
                    if (!this.lobbies.has(lobbyUUID)) 
                        callback({ valid: false, lobby: null });

                    let lobby: Lobby = this.lobbies.get(lobbyUUID)!;

                    if (lobby.isAccessible()) {
                        lobby.addPlayer(player, socket);
                        callback({ valid: true, lobby: lobby.toJSON() });
                    } else {
                        // Ne pas donner des informations qui ne servent à rien
                        callback({ valid: false, lobby: null });
                    }                   
                });

                callback({ player: player });
            });
        });
    }

    public getLobbies() : Map<string, Lobby> {
        return this.lobbies;
    }

    public destroy() : void {
        this.lobbies.forEach(lobby => {
            lobby.destroy();
        })
    }

}