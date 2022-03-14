import * as http from 'http';
import { Server } from 'socket.io';
import * as io from 'socket.io-client';
import { Lobby } from '../src/lobby';
import { Player } from '../src/player';
import type { AddressInfo } from 'net';

describe("lobby", () => {
    let lobby: Lobby;
    let clientSocket: io.Socket;

    // Create the server
    beforeAll((done) => {
        let httpServer = http.createServer();
        let ioServer = new Server(httpServer);
        lobby = new Lobby("test", ioServer);

        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            clientSocket = io.connect(`http://localhost:${port}`);
            
            ioServer.on("connection", (socket) => {
                console.log("oui");
                lobby.addPlayer(new Player('test'), socket);
            });
            
            clientSocket.on("connect", done);
        });
    });

    afterAll((done) => {
        lobby.destroy();
        clientSocket.close();
        done();
    });

    test("chat server verification", (done) => {
        clientSocket.on("recv message", ({ player, message } : { player: string, message: string }) => {
            console.log("oui oui");
            expect(message).toBe('test');
            expect(player).toBe('test');
            done();
        });

        clientSocket.emit("send message", 'test');
        console.log("non");
    });


});
