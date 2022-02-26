import * as http from 'http';
import { Server } from 'socket.io';
import * as ioClient from 'socket.io-client';
import type { AddressInfo } from 'net';

describe("socket io testing", () => {
    let clientSocket: any;
    let serverSocket: any;
    let io: Server;    

    beforeAll((done) => {
        const httpServer = http.createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            clientSocket = ioClient.connect('http://localhost:${port}');
            
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            
            clientSocket.on("connect", done);
        });
    });
    
    afterAll((done) => {
        io.close();
        clientSocket.close();
        done();
    });

    test("should work", (done) => {
        clientSocket.on("hello", (arg: string) => {
            expect(arg).toBe("world");      
            done();
        });

        serverSocket.emit("hello", "world");
    });

    test("should work (with ack)", (done) => {
        serverSocket.on("hi", (cb: ((message: string) => string)) => {
            cb("hola");
        });

        clientSocket.emit("hi", (arg: string) => {
            expect(arg).toBe("hola");
            done();
        });
    });
});
