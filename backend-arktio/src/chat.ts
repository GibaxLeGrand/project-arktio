import { Lobby } from './lobby';
import { Player } from './player';
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
        
        this.destroy();
        this.sockets.clear();

        playersAndTheirSocket.forEach((socket: Socket, player: Player) => {
            socket.removeAllListeners("send message");
            socket.join(this.lobby.getUUID());    
            this.sockets.add(socket);

            socket.on("send message", (message: string) => {
                console.log("[%s] %s: %s", this.lobby.getUUID(), player, message);
                
                this.lobby.getIO().sockets
                    .in(this.lobby.getUUID())
                    .emit("recv message", { player: player.getUUID(), message: message });
            });   
        });
    }

    public destroy(): void {
        this.sockets.forEach((socket: Socket) => {
            socket.leave(this.lobby.getUUID());
        });
    }

}