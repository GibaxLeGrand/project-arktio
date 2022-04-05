import * as http from 'http';
import { Server } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby } from '../src/lobby';
import { Player } from '../src/player';
import type { AddressInfo } from 'net';

describe("lobby", () => {
    let httpServer: http.Server;
    let lobby: Lobby;
    let ioServer: Server;
    let clientSocket: io.Socket;

    // Create the server
    beforeAll((done) => {
        httpServer = http.createServer();
        ioServer = new Server(httpServer);
        lobby = new Lobby("Test", ioServer, false);

        httpServer.listen(() => {
            let i = 1;
            const port = (httpServer.address() as AddressInfo).port;
            clientSocket = io.connect(`http://localhost:${port}`);
            
            ioServer.on("connection", (socket) => {
                lobby.addPlayer(new Player('Test' + i++), socket);
            });
            
            clientSocket.on("connect", done);
        });
    });

    afterAll((done) => {
        lobby.destroy();
        clientSocket.close();
        ioServer.close();
        done();
    });

    test("chat verification", (done) => {
        clientSocket.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe('Test1');
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
            expect(player).toBe('Test1');

            if (++received === 3) done();
        });

        clientSocket2.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe('Test1');
            
            clientSocket2.close();
            if (++received === 3) done();
        });

        clientSocket3.on("recv message", ({ player, message } : { player: string, message: string }) => {
            expect(message).toBe('test');
            expect(player).toBe('Test1');
            
            clientSocket3.close();
            if (++received === 3) done();
        });

        clientSocket2.on("connect", () => {
            if (++connected >= 2) {
                clientSocket.emit("send message", 'test');
            }
        });

        clientSocket3.on("connect", () => {
            if (++connected >= 2) {
                clientSocket.emit("send message", 'test');
            } 
        });
    });

    test("good owner player when alone", (done) => {
        expect(lobby.getOwner()?.getUUID()).toBe('Test1');
        done();
    });

    test("good owner player when multiple players", (done) => {
        const port = (httpServer.address() as AddressInfo).port;
        let clientSocket2 = io.connect(`http://localhost:${port}`);
        let clientSocket3 = io.connect(`http://localhost:${port}`);

        expect(lobby.getOwner()?.getUUID()).toBe('Test1');
        
        clientSocket2.close();
        clientSocket3.close();
        done();
    });

});
