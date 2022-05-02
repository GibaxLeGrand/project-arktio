import { Server, Socket, } from 'socket.io';
import { LobbyPlayer } from './player';
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

    private isInLobby(player: LobbyPlayer) :boolean{
        let array = Array.from(this.lobbies.entries());
    
        for (let i=0; i<array.length; i++) {
            if (array[i][1].contain(player)) {
                return true;
            }
        }

        return false;
    }

    // Genrate 6 digit lobby id
    private generateLobbyId(): string {
        let id = '';
        do {
            for (let i = 0; i < 6; i++) {
                id += Math.floor(Math.random() * 10);
            }
        } while (this.lobbies.has(id));
        return id;
    }

    private setup() : void {
        this.io.on("connection", (socket: Socket) => {
            console.log("Connected client on port %s", this.port);
        
            socket.on("player information", async (uuid: string, callback: ({ player } : { player: LobbyPlayer }) => void) => {
                let player: LobbyPlayer = await LobbyPlayer.instantiate(uuid);

                socket.removeAllListeners("player information");

                socket.on("create lobby", (callback: (({ lobby } : { lobby: LobbyJSON }) => void)) => {
                    if (this.isInLobby(player)) {
                        return;
                    }

                    let lobbyUUID: string = this.generateLobbyId()
                    let lobby: Lobby = new Lobby(lobbyUUID, this.io, true);
                    this.lobbies.set(lobbyUUID, lobby);
                
                    lobby.addPlayer(player, socket);
                    callback({ lobby: lobby.toJSON() });
                });

                socket.on("join lobby", (lobbyUUID: string, callback: (({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => void)) => { 
                    if (this.isInLobby(player)) {
                        return;
                    }
                    
                    if (!this.lobbies.has(lobbyUUID)) {
                        callback({ valid: false, lobby: null });
                        return;
                    }
 
                    let lobby: Lobby = this.lobbies.get(lobbyUUID)!;

                    if (lobby.isAccessible()) {
                        let valid = lobby.addPlayer(player, socket);

                        if (valid) { 
                            callback({ valid: true, lobby: lobby.toJSON() });
                        } else {
                            // Ne pas donner des informations qui ne servent à rien
                            callback({ valid: false, lobby: null});
                        }
                    } else {
                        // Ne pas donner des informations qui ne servent à rien
                        callback({ valid: false, lobby: null });
                    }                   
                });

                socket.on("disconnect", (reason) => {
                    this.lobbies.forEach((lobby, uuid) => {
                        if (lobby.contain(player)) {
                            lobby.removePlayer(player);
                        }
                    });
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