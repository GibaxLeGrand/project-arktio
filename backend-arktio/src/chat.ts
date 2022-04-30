import { Lobby } from './lobby';
import { LobbyPlayer } from './player';
import { Socket } from 'socket.io';

export class Chat {
    private sockets : Set<Socket>;
    private lobby : Lobby;

    constructor(lobby: Lobby) {
        this.lobby = lobby;
        this.sockets = new Set();
    }

    public update(): void {
        let playersAndTheirSocket = this.lobby.getPlayersAndTheirSocket();
        
        this.clear();
        this.sockets.clear();

        playersAndTheirSocket.forEach((socket: Socket, player: LobbyPlayer) => {
            if (socket === null) return;

            this.sockets.add(socket);

            socket.on("send message", (message: string) => {                
                this.lobby.getIO().sockets
                    .in(this.lobby.getUUID())
                    .emit("recv message", { player: player.getUUID(), message: message });
            });   
        });
    }

    public clear(): void {
        this.sockets.forEach((socket: Socket) => {
            socket.removeAllListeners("send message");
        });
    }

    public destroy(): void {
        this.clear();
    }

}