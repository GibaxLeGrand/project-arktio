import * as http from 'http';
import { Server } from 'socket.io';
import * as io from 'socket.io-client';
import { ChatServer } from '../src/chat';
import { Lobby } from '../src/lobby';
import { Player } from '../src/player';

describe("chat", () => {
    let chatServer: ChatServer | null;
    let clientSocket: any;
    let port = process.env.PORT || 8080;

    // Create the server
    beforeAll((done) => {
        let httpServer = http.createServer();
        let ioServer = new Server(httpServer);
        let lobby = new Lobby("test", ioServer);

        ioServer.on("connection", (socket) => {
            lobby.addPlayer(new Player('test'), socket);
        });

        clientSocket = io.connect(`http://localhost:${port}`);
        done();
    });

    afterAll((done) => {
        chatServer?.destroy();
        clientSocket.close();
        done();
    });

    test("chat server verification", (done) => {
        clientSocket.on("recv message", ({ player, message } : { string, string }) => {
            expect(message).toBe('test');
            expect(player).toBe('test');
            done();
        });

        clientSocket.emit("send message", 'test');
    });

});
