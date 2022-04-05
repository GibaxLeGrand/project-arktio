import { Server, Socket } from 'socket.io';
import { Player } from './player';
import { Lobby, LobbyJSON } from './lobby';
import * as http from 'http';

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
        
            socket.on("player information", (uuid: string, callback: ({ player } : { player: Player }) => void) => {
                let player: Player = new Player(uuid); // TODO: FIND IN DATABASE
        
                socket.removeAllListeners("player information");
        
                socket.on("join lobby", (lobbyUUID: string, callback: (({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => void)) => {
                    let lobby: Lobby;
                    
                    if (this.lobbies.has(lobbyUUID)) {
                        lobby = this.lobbies.get(lobbyUUID)!;
                    } else {
                        lobby = new Lobby(lobbyUUID, this.io, true);
                        this.lobbies.set(lobbyUUID, lobby)
                    }

                    if (lobby.isAccessible()) 
                        lobby.addPlayer(player, socket);
            
                    callback({ valid: lobby.isAccessible(), lobby: lobby.toJSON() });
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