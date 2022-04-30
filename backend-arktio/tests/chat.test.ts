import * as http from 'http';
import { Server } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby, LobbyJSON, LobbyState } from '../src/lobby';
import { LobbyPlayer, PlayerJSON } from '../src/player';
import { LobbyManager } from '../src/lobbymanager';
import type { AddressInfo } from 'net';
import * as db from '../src/bdd';
import { createTestUser } from './resources/create_test_user';

describe("chat", () => {
    let httpServer: http.Server;
    let lobbyUUID: string;
    let lobbyManager: LobbyManager;
    let clientSocket: io.Socket;
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
                lobbyManager = new LobbyManager(httpServer, port);

                clientSocket = io.connect(`http://localhost:${port}`);
                clientSocket.on("connect", () => {
                    clientSocket.emit("player information", usersUUID[0], ({ player }: {player: PlayerJSON}) => {
                        clientSocket.emit("create lobby", ({ lobby } : { lobby: LobbyJSON }) => {
                            lobbyUUID = lobby.uuid;
                            connected();
                        });
                    });                    
                });
            });
        });
    });

    afterAll(async () => {
        clientSocket.close();
        lobbyManager.destroy();
        await db.disconnect();
    });

    test("chat verification", (done) => {
        clientSocket.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe(usersUUID[0]);
            done();
        });

        clientSocket.emit("send message", 'test');
    });

    test("chat verification with multiple player", (done) => {
        const port = (httpServer.address() as AddressInfo).port;
        let clientSocket2 = io.connect(`http://localhost:${port}`);
        let clientSocket3 = io.connect(`http://localhost:${port}`);
        let received = 0, connected = 0;
        
        clientSocket.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe(usersUUID[0]);

            if (++received === 3) done();
        });

        clientSocket2.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe(usersUUID[0]);
            
            clientSocket2.close();
            if (++received === 3) done();
        });

        clientSocket3.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe(usersUUID[0]);
            
            clientSocket3.close();
            if (++received === 3) done();
        });

        clientSocket2.on("connect", () => {
            clientSocket2.emit("player information", usersUUID[1], ({ player }: { player: PlayerJSON }) => {
                clientSocket.emit("join lobby", lobbyUUID, ({ lobby } : { lobby: LobbyJSON }) => {
                    if (++connected >= 2) {
                        clientSocket.emit("send message", 'test');
                    }
                });
            }); 
        });

        clientSocket3.on("connect", () => {
            clientSocket3.emit("player information", usersUUID[2], ({ player }: { player: PlayerJSON }) => {
                clientSocket.emit("join lobby", lobbyUUID, ({ lobby } : { lobby: LobbyJSON }) => {
                    if (++connected >= 2) {
                        clientSocket.emit("send message", 'test');
                    } 
                });
            });
        });
    });

});
