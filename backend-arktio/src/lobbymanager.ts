import { Server, Socket, } from 'socket.io';
import { LobbyPlayer } from './player';
import { Lobby, LobbyJSON } from './lobby';
import * as http from 'http';

export class LobbyManager {
    private static io: Server;
    private static lobbies: Map<string, Lobby>;
    private static port: string | number;

    public static init(server: http.Server, port: string | number) {
        console.log(server.address());
        LobbyManager.io = new Server(server, {path: '/socket.io'});
        LobbyManager.lobbies = new Map();
        LobbyManager.port = port;
        LobbyManager.setup();
    }

    public static isInLobby(player: LobbyPlayer) :boolean{
        let array = Array.from(this.lobbies.entries());
        for (let i=0; i<array.length; i++) {
            if (array[i][1].getPlayers().find(p=>p.getUUID() === player.getUUID())) {
                return true;
            }
        }

        return false;
    }

    // Generate 6 digit lobby id
    private static generateLobbyId(): string {
        let id = '';
        do {
            for (let i = 0; i < 6; i++) {
                id += Math.floor(Math.random() * 10);
            }
        } while (this.lobbies.has(id));
        return id;
    }

    private static setup() : void {
        this.io.on("connection", (socket: Socket) => {
            console.log("Connected client on port %s", this.port);
        
            socket.on("player information", async (uuid: string, callback: ({ player } : { player: LobbyPlayer }) => void) => {
                let player: LobbyPlayer = await LobbyPlayer.instantiate(uuid);

                socket.removeAllListeners("player information");

                socket.on("create lobby", (callback: (({ valid, lobby } : { valid:boolean, lobby: LobbyJSON }) => void)) => {
                    if (this.isInLobby(player)) {
                        callback({ valid:false, lobby: null});
                        return;
                    }

                    let lobbyUUID: string = LobbyManager.generateLobbyId()
                    let lobby: Lobby = new Lobby(lobbyUUID, this.io);
                    this.lobbies.set(lobbyUUID, lobby);
                
                    lobby.addPlayer(player, socket);
                    callback({ valid:true, lobby: lobby.toJSON() });
                });

                socket.on("join lobby", (lobbyUUID: string, callback: (({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => void)) => { 
                    if (this.isInLobby(player)) {
                        callback({ valid: false, lobby: null});
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
                    console.log("Client disconnected: %s", reason);
                    this.lobbies.forEach((lobby, uuid) => {
                        console.log("Lobby: %s", uuid);
                        console.log(lobby);
                        if (lobby.contain(player)) {
                            console.log("Player %s disconnected from lobby %s", player.getUUID(), uuid);
                            lobby.removePlayer(player);
                        }
                    });
                });

                callback({ player: player });
            });
        });
    }

    public static destroyLobby(lobby: Lobby) : void {
        lobby.destroy();
        LobbyManager.lobbies.delete(lobby.getUUID());
    }

    public static getLobbies() : Map<string, Lobby> {
        return LobbyManager.lobbies;
    }

    public static destroy() : void {
        LobbyManager.lobbies.forEach(lobby => {
            lobby.destroy();
        })
    }

}