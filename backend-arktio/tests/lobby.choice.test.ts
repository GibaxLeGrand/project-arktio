import { Socket } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON } from '../src/lobby';
import { LobbyPlayer, PlayerJSON } from '../src/player';
import { LobbyManager } from '../src/lobbymanager';
import type { AddressInfo } from 'net';
import * as http from 'http';
import * as db from '../src/bdd';
import { connect } from '../src/bdd';

describe("lobby choice", () => {
    let lobbyManager: LobbyManager;
    let clientSocket: io.Socket;
    let usersUUID: string[];

    // Create the server
    beforeAll(async () => {
        usersUUID = [];
        await db.connect("development");

        try {
            await db.getUserAuthentificate("a@test.com").then(user => {
                usersUUID.push(user.user_uuid);
            });
        } catch( error: any) {
            await db.putUser("testPlayer1", "a@test.com", "testpassword").then(user => {
                usersUUID.push(user.user_uuid);
            });
        }  
        
        const httpServer = http.createServer();
        
        await new Promise<void>(connected => {
            httpServer.listen(() => {
                const port = (httpServer.address() as AddressInfo).port;
                lobbyManager = new LobbyManager(httpServer, port);
                clientSocket = io.connect(`http://localhost:${port}`);
                clientSocket.on("connect", connected);
            });
        });
    });

    afterAll(async () => {
        clientSocket.close();
        lobbyManager.destroy();
        await db.disconnect();
    });

    test("lobby creation", (done) => {
        clientSocket.emit("player information", usersUUID[0], ({player}: {player: PlayerJSON}) => {
            expect(player.uuid).toBe(usersUUID[0]);

            clientSocket.emit("create lobby", ({ lobby } : { lobby: LobbyJSON }) => {
                expect(lobby.players.length).toBe(1);
                done();
            });
        });
    });

});
