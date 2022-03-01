import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

export class ChatServer {
    public static readonly PORT:number = 8080;
    private server: http.Server;
    private io: Server;
    private port: string | number;

    constructor(server : http.Server) {
        this.server = server;
        this.io = new Server(server);
        this.port = process.env.PORT || ChatServer.PORT;
        this.listen();
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });

        this.io.on("connection", (socket: any) => {
            console.log("Connected client on port %s", this.port);
            // Assign client to room
            socket.join(socket.handshake.query.room)

            // Remember room
            const room = socket.handshake.query.room

            // Message handler
            socket.on("message", ({player, message} : {player:string, message:string}) => {
                console.log("[%s] %s: %s", room, player, message);
                this.io.sockets.in(room).emit("message", { player: player, message: message });
            });
        });
    }

    public getPort(): string | number {
        return this.port;
    }

    public close(): void {
        this.server.close();
    }
}