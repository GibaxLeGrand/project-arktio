import { Socket } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON, LobbyState } from '../src/lobby';
import { LobbyPlayer, PlayerJSON } from '../src/player';
import { LobbyManager } from '../src/lobbymanager';
import type { AddressInfo } from 'net';
import * as http from 'http';
import * as db from '../src/bdd';
import { connect } from '../src/bdd';
import { State } from '../../gamelogic-arktio/src/state'
import { createTestUser } from './resources/create_test_user';

describe("game", () => {
    let clientSockets: io.Socket[] = [];
    let httpServer: http.Server;
    let usersUUID: string[] = [];
    let users: PlayerJSON[] = [];

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

                clientSockets.push(io.connect(`http://localhost:${port}`));
                clientSockets.push(io.connect(`http://localhost:${port}`));
                clientSockets.push(io.connect(`http://localhost:${port}`));

                let connection = 0;

                for (let i=0; i<clientSockets.length; i++) {
                    clientSockets[i].on("connect", () => {
                        connection += 1;
                        if (connection >= 3) connected();
                    });
                }
            });
        });

        await new Promise<void>(inLobby => {
            clientSockets[0].emit("player information", usersUUID[0], ({ player }: {player: PlayerJSON}) => {
                users.push(player);
                clientSockets[0].emit("create lobby", ({ lobby } : { lobby: LobbyJSON }) => {
                    let lobbyUUID = lobby.uuid;
                    
                    clientSockets[1].emit("player information", usersUUID[1], ({ player }: { player: PlayerJSON }) => {
                        users.push(player);
                        clientSockets[1].emit("join lobby", lobbyUUID, ({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => {
                            clientSockets[2].emit("player information", usersUUID[2], ({ player }: { player: PlayerJSON }) => {
                                users.push(player);
                                clientSockets[2].emit("join lobby", lobbyUUID, ({ valid, lobby } : { valid: boolean, lobby: LobbyJSON }) => {
                                    inLobby();
                                });
                            })
                        });
                    }); 
                });
            });
        });

    });

    afterAll(async () => {
        for (let i=0; i<clientSockets.length; i++) 
            clientSockets[i].close();

        LobbyManager.destroy();
        httpServer.close();
        await db.disconnect();

        users = [];
        clientSockets = [];
        usersUUID = [];
    });

    test("launch game", (done) => {
        clientSockets[0].emit("launch game");
        
        clientSockets[0].on("update gamestate", (gamestate: State) => {
            expect(gamestate.joueur_actuel).toBe(users[0].uuid);
            done();
        });
    });
    
});
