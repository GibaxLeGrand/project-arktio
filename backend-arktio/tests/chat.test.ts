import * as http from 'http';
import * as io from 'socket.io-client';
import { ChatServer } from '../src/chat';

describe("chat", () => {
    let chatServer: ChatServer | null;

    // Create the server
    beforeAll((done) => {
        const httpServer = http.createServer();
        chatServer = new ChatServer(httpServer);
        done();
    });

    afterAll((done) => {
        chatServer?.close();
        done();
    });

    test("chat server verification", (done) => {
        let port: string | number = chatServer?.getPort() || -1;
        expect(port).toBeGreaterThan(-1);

        let socket: any = io.connect(`http://localhost:${port}`, { query: { room: 'test' } });

        socket.on("message", ({player, message} : {player: string, message: string}) => {
            expect(player).toBe('testingPlayer');
            expect(message).toBe('test');
            socket.close();
            done();
        });

        socket.emit("message", {player: 'testingPlayer', message: 'test'} );
    });

});
