import { Server, Socket } from 'socket.io';
import { LobbyPlayer } from './player';
import { Lobby, LobbyJSON } from './lobby';
import * as crypto from 'crypto';
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
        
            socket.on("player information", async (uuid: string, callback: ({ player } : { player: LobbyPlayer }) => void) => {
                console.log("oui ?");
                let player: LobbyPlayer = await LobbyPlayer.instantiate(uuid);
        
                console.log("oui bonjour");
                socket.removeAllListeners("player information");

                socket.on("create lobby", (callback: (({ lobby } : { lobby: LobbyJSON }) => void)) => {
                    let lobbyUUID: string = crypto.randomUUID();
                    let lobby: Lobby = new Lobby(lobbyUUID, this.io, true);
                    this.lobbies.set(lobbyUUID, lobby);
                    
                    lobby.addPlayer(player, socket);
                    callback({ lobby: lobby.toJSON() });
                });

                socket.on("join lobby", (lobbyUUID: string, callback: (({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => void)) => {                    
                    if (!this.lobbies.has(lobbyUUID)) {
                        callback({ valid: false, lobby: null });
                        return;
                    }
 
                    let lobby: Lobby = this.lobbies.get(lobbyUUID)!;

                    if (lobby.isAccessible()) {
                        let valid = lobby.addPlayer(player, socket);

                        if (valid) 
                            callback({ valid: true, lobby: lobby.toJSON() });
                        else
                            // Ne pas donner des informations qui ne servent à rien
                            callback({ valid: false, lobby: null});
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