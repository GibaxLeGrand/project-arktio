import { Socket } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON } from '../src/lobby';
import { LobbyPlayer, PlayerJSON } from '../src/player';
import { LobbyManager } from '../src/lobbymanager';
import type { AddressInfo } from 'net';
import * as http from 'http';

describe("lobby", () => {
    let lobbyManager: LobbyManager;
    let clientSocket: io.Socket;

    // Create the server
    beforeAll((done) => {
        const httpServer = http.createServer();
        
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            lobbyManager = new LobbyManager(httpServer, port);
            clientSocket = io.connect(`http://localhost:${port}`);
            clientSocket.on("connect", done);
        });
    });

    afterAll((done) => {
        clientSocket.close();
        lobbyManager.destroy();
        done();
    });

    test("lobby creation", (done) => {
        clientSocket.emit("player information", 'playerTest', ({player}: {player: PlayerJSON}) => {
            expect(player.uuid).toBe("playerTest");

            clientSocket.emit("join lobby", 'lobbyTest', ({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => {
                expect(valid).toBe(true);
                expect(lobby.owner.uuid).toBe('playerTest');
                expect(lobby.players.length).toBe(1);
                expect(lobby.uuid).toBe('lobbyTest');
                done();
            });
        });
    });

});
