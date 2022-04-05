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
import {hash_password} from "./scripts/security/password";

declare global {
    interface Crypto {
      randomUUID: () => string;
    }
}

dotenv.config();

const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(sessions({
    secret: "hypersecretcookiesecret",
    cookie: {maxAge: 1000 * 60 * 60 * 24}
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
        //
        // Il y a une liste d'erreurs que la BDD peut renvoyer (voir bdd/index.ts)
        // Les erreurs peuvent être différenciées avec un instanceof <TypeErreur>
        //
        // Pour une liste d'erreurs possibles,
        // voir ce lien : https://vincit.github.io/objection.js/recipes/error-handling.html
        try {
            const toto = await db.getAllUsers();
            console.log(toto[0].user_name)
        } catch (error) {
            console.log(error);
        }

        try {
            console.log(await db.getUser(17));
        } catch (error) {
            console.log(error);
        }

        try {
            console.log(await db.getUserAuthentificate("c@gmail.com"));
        } catch (error) {
            console.log(error);
        }

        try {
            console.log(await db.putUser("toto", "c@c.com", hash_password("aaaaaaa")));
        } catch (error: any) {
            // Quelques exemples pour traiter les erreurs
            if (error instanceof db.ConstraintViolationError)
                console.log("Erreur : utilisateur existe déja")
            else if (error instanceof db.UniqueViolationError)
                console.log("Erreur : contrainte unique violée");
        }

        try {
            console.log(await db.setUsername(64, "test123456"));
        } catch (error: any) {
            console.log("Erreur de merde");
        }
    });

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
        
            socket.on("player information", (uuid: string, callback: ({ player } : { player: Player }) => void) => {
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

                callback({ player: player });
            });
        });
    }

    public getLobbies() : Map<string, Lobby> {
        return this.lobbies;
    }

    public destroy() : void {
        this.lobbies.forEach(lobby => {
            lobby.destroy();
        })
    }

}

new LobbyManager();
