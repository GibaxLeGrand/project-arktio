import express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { Lobby } from './lobby';
import { Player } from './player';

export class ChatServer {
    private sockets : Set<any>;
    private lobby : Lobby;

    constructor(lobby: Lobby) {
        this.lobby = lobby;
        this.sockets = new Set();
    }

    public update(): void {
        let playersAndTheirSocket = this.lobby.getPlayersAndTheirSocket();
        
        this.destroy();
        this.sockets.clear();

        playersAndTheirSocket.forEach((player: Player, socket: any) => {
            socket.removeAllListeners("send message");
            socket.join(this.lobby.getUUID);    
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
        this.sockets.forEach((socket: any) => {
            socket.leave(this.lobby.getUUID());
        });
    }

}