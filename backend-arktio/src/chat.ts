import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

export class ChatServer {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: http.Server;
    private io: Server;
    private port: string | number;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.port = process.env.PORT || ChatServer.PORT;
        this.listen();
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });

        this.io.on("connection", (socket: any) => {
            console.log("Connected client on port %s", this.port);
            socket.join(socket.handshake.query.room);
            
            socket.on("message", (player: string, message: string) => {
                console.log(socket.rooms);
                console.log("[%s] %s: %s", socket.rooms[Object.keys(socket.rooms)[0]], player, message);
                this.io.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit("message", { player: player, message: message } );
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