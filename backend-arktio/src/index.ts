import { Lobby } from './lobby';
import express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { Player } from './player';
import * as core from 'express-serve-static-core';
import dotenv from "dotenv";
import apiRoute from "./routes/apiRoute";
import bodyParser from "body-parser";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import * as db from './bdd';

declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

dotenv.config();

const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(sessions({
    secret: "hypersecretcookiesecret",
    cookie: {maxAge: 1000*60*60*24}
}))

app.use(cookieParser());
const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("Running server on port %s", port);
});

// Link Front
app.use("/", express.static("../frontend-arktio/public/"))

// Api
app.use("/api", apiRoute);

// Connexion à la BDD
db.connect(process.env.NODE_ENV!)
    .then(async (status) => {
        // Vérification de la connexion
        if (status[0]["Status"] != "OK") {
            await db.disconnect();
            return;
        } else {
            console.log("Database Connected!")
        }
        // Appel d'une fonction asynchrone qui fait une requete dans la BDD
        const toto = await db.getAllUsers();
        console.log(toto[0].user_name)
        console.log(await db.getUser(1));
        console.log(await db.getUser("c@gmail.com", "chopatate"));
        console.log(await db.putUser("toto", "c@c.com", "aaaaaaa"));
    });

console.log("Hello World");

export class LobbyManager {
    private io: Server;
    private lobbies: Map<string, Lobby>;

    constructor() {
        this.io = new Server(server);
        this.lobbies = new Map();
        this.setup();
    }

    private setup() : void {
        this.io.on("connection", (socket: Socket) => {
            console.log("Connected client on port %s", port);
        
            socket.on("player information", (uuid: string) => {
                let player: Player = new Player(uuid); // TODO: FIND IN DATABASE
        
                socket.removeAllListeners("player information");
        
                socket.on("join lobby", (lobbyUUID: string, callback: (({ valid, lobby } : { valid: boolean, lobby: Lobby }) => void)) => {
                    let lobby: Lobby;
                    
                    if (this.lobbies.has(lobbyUUID)) {
                        lobby = this.lobbies.get(lobbyUUID)!;
                    } else {
                        lobby = new Lobby(lobbyUUID, this.io, true);
                        this.lobbies.set(lobbyUUID, lobby)
                    }

                    if (lobby.isAccessible()) 
                        lobby.addPlayer(player, socket);
            
                    callback({ valid: lobby.isAccessible(), lobby: lobby });
                });
            });
        });
    }
}

new LobbyManager();