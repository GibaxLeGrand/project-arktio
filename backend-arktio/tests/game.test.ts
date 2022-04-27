import * as http from 'http';
import { Server } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON } from '../src/lobby';
import type { AddressInfo } from 'net';
import { LobbyManager } from '../src/lobbymanager';
import { LobbyPlayer, PlayerJSON } from '../src/player';

describe("game", () => {
    let lobbyManager: LobbyManager;
    let clientSocket: io.Socket;
    let lobby: Lobby;

    // Create the server
    beforeAll((done) => {
        const httpServer = http.createServer();
        
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            lobbyManager = new LobbyManager(httpServer, port);
            clientSocket = io.connect(`http://localhost:${port}`);
            
            clientSocket.on("connection", () => {
                clientSocket.emit("player information", 'playerTest', ({player}: {player: PlayerJSON}) => {
                    expect(player.uuid).toBe("playerTest");
        
                    clientSocket.emit("create lobby", ({ lobby } : { lobby: LobbyJSON }) => {
                        expect(lobby.owner.uuid).toBe('playerTest');
                        expect(lobby.players.length).toBe(1);
                        done();
                    });
                });
            });

            clientSocket.on("connect", done);
        });
    });

    afterAll((done) => {
        clientSocket.close();
        lobbyManager.destroy();
        done();
    });

    
});
