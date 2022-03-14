import { Lobby } from './lobby';
import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { Player } from './player';

declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const io = new Server(server);

const lobbies : Map<string, Lobby> = new Map();

server.listen(port, () => {
    console.log("Running server on port %s", port);
});

io.on("connection", (socket: any) => {
    console.log("Connected client on port %s", port);

    socket.on("player information", (uuid: string) => {
        let player : Player = new Player(uuid); // TODO: FIND IN DATABASE

        socket.on("lobby choice", (lobbyUUID: string, callback: Function) => {
            if (lobbies.has(lobbyUUID)) {
                let lobby: Lobby | undefined = lobbies.get(lobbyUUID);
                if (lobby?.getNumberOfPlayer() && lobby?.getNumberOfPlayer() < 4) { 
                    lobby?.addPlayer(player, socket);
                    callback(true);
                } else {
                    callback(false);
                }
            } else {
                callback(false);
            }
        });
    
        socket.on("lobby creation", (cb: ((message: string) => string)) => {
            let lobbyUUID: string = crypto.randomUUID();
            let lobby = new Lobby(lobbyUUID, io);
            lobby.addPlayer(player, socket);

            lobbies.set(lobbyUUID, lobby);

            cb(lobbyUUID);
        });
    });
});