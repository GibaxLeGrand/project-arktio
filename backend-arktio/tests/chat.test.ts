import * as io from 'socket.io-client';
import { ChatServer } from '../src/chat';

describe("chat", () => {
    const chatServer: ChatServer = new ChatServer();

    test("chat server verification", (done) => {
        const port: string | number = chatServer.getPort();
        const socket: any = io.connect('http://localhost:${port}', { query: { room: 'test' } });

        socket.emit("message", {player: 'testingPlayer', message: 'test'} );

        socket.on("message", (player: string, message: string) => {
            expect(player).toBe('testingPlayer');
            expect(message).toBe('test');
            done();
        });
    });
});
