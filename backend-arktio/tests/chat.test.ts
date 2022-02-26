import * as io from 'socket.io-client';
import { ChatServer } from '../src/chat';

describe("chat", () => {
    let chatServer: ChatServer|null;

    // Create the server
    beforeAll((done) => {
        chatServer = new ChatServer();
        done()
    })

    test("chat server verification", (done) => {
        const port: string | number = chatServer?.getPort() || -1;
        expect(port).toBeGreaterThan(-1);
        const socket: any = io.connect(`http://localhost:${port}`, { query: { room: 'test' } });



        socket.on("message", ({player, message} : {player: string, message: string}) => {
            expect(player).toBe('testingPlayer');
            expect(message).toBe('test');
            done();
        });

        socket.emit("message", {player: 'testingPlayer', message: 'test'} );
    });
});
