import { Socket } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON } from '../src/lobby';
import { LobbyPlayer, PlayerJSON } from '../src/player';
import { LobbyManager } from '../src/lobbymanager';
import type { AddressInfo } from 'net';
import * as http from 'http';
import * as db from '../src/bdd';

describe("lobby", () => {
    let lobbyManager: LobbyManager;
    let clientSocket: io.Socket;
    let usersUUID: string[];

    // Create the server
    beforeAll(async (done) => {
        await db.connect("development");

        try {
            await db.getUserAuthentificate("a@test.com")
        } catch( error: any) {
            let user: db.Users = await db.putUser("testPlayer1", "a@test.com", "test");
            usersUUID.push(user.user_uuid);
        }  
        
        const httpServer = http.createServer();
        
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            lobbyManager = new LobbyManager(httpServer, port);
            clientSocket = io.connect(`http://localhost:${port}`);
            clientSocket.on("connect", done);
        });
    });

    afterAll(async (done) => {
        clientSocket.close();
        lobbyManager.destroy();
        await db.disconnect();
        done();
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
