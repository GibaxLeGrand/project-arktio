import { Socket } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON, LobbyState } from '../src/lobby';
import { LobbyPlayer, PlayerJSON } from '../src/player';
import { LobbyManager } from '../src/lobbymanager';
import type { AddressInfo } from 'net';
import * as http from 'http';
import * as db from '../src/bdd';
import { connect } from '../src/bdd';
import { createTestUser } from './resources/create_test_user';

describe("lobby choice", () => {
    let clientSocket: io.Socket;
    let httpServer: http.Server;
    let usersUUID: string[];

    beforeAll(async () => {
        usersUUID = [];
        await db.connect("development");

        usersUUID.push(await createTestUser("testPlayer1", "a@test.com"));
        usersUUID.push(await createTestUser("testPlayer2", "b@test.com"));
        usersUUID.push(await createTestUser("testPlayer3", "c@test.com"));

        httpServer = http.createServer();
        
        await new Promise<void>(connected => {
            httpServer.listen(() => {
                const port = (httpServer.address() as AddressInfo).port;
                LobbyManager.init(httpServer, port);
                clientSocket = io.connect(`http://localhost:${port}`);
                clientSocket.on("connect", connected);
            });
        });
    });

    afterAll(async () => {
        clientSocket.close();
        LobbyManager.destroy();
        httpServer.close();
        await db.disconnect();
    });

    test("lobby creation", (done) => {
        clientSocket.emit("player information", usersUUID[0], ({player}: {player: PlayerJSON}) => {
            expect(player.uuid).toBe(usersUUID[0]);

            clientSocket.emit("create lobby", ({ lobby } : { lobby: LobbyJSON }) => {
                expect(lobby.players.length).toBe(1);
                expect(lobby.owner.uuid).toBe(usersUUID[0]);
                expect(lobby.state).toBe(LobbyState.Lobby);
                done();
            });
        });
    });

});
