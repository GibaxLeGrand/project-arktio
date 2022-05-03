import express from 'express';
import * as http from 'http';
import * as core from 'express-serve-static-core';
import dotenv from "dotenv";
import apiRoute from "./routes/apiRoute";
import bodyParser from "body-parser";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import * as db from './bdd';
import {hash_password} from "./scripts/security/password";
import {LobbyManager} from './lobbymanager';

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
       
        // Des tests
        /*
        console.log("---------- All users");
        console.log(await db.getAllUsers());

        console.log("---------- User 1 and User 2 with password");
        console.log(await db.getUserAuthentificate("toto@gmail.com"));
        console.log(await db.getUserAuthentificate("titi@gmail.com"));

        console.log("---------- User 1 and User 2 without password");
        console.log(await db.getUser("1"));
        console.log(await db.getUser("2"));

        console.log("---------- New user");
        const new_user: db.Users = await db.putUser("hello", "world@gmail.com", "azertyazerty");
        console.log(await db.getAllUsers());

        console.log("---------- Update new user email");
        console.log(await db.setEmail(new_user.user_uuid, "hello_world@gmail.com"));

        console.log("---------- Update new user password");
        console.log(await db.setPassword(new_user.user_uuid, "quertyquerty"));

        console.log("---------- Update new user username");
        console.log(await db.setUsername(new_user.user_uuid, "hello_world"));
      
        console.log("---------- Delete new user (cleanup)");
        await db.Users.query().deleteById(new_user.user_uuid);
        console.log(await db.getAllUsers());

        console.log("---------- Get all lobbys");
        console.log(await db.getAllLobbys());
        
        console.log("---------- Get a lobby");
        console.log(await db.getLobby("1"));

        console.log("---------- Create a lobby");
        const lobby: db.Lobby = await db.putLobby("", "1");
        console.log(await db.getAllLobbys());
        console.log(await db.getAllUsers());

        console.log("---------- Get Lobby from Player");
        const user: db.Users = await db.getUser("1");
        if (user === undefined) {
            console.log("User not found");
        }
        else {   
            console.log(await db.getLobby(user.user_current_lobby));
        }

        console.log("---------- Add a player to a lobby");
        await db.setAddUser(lobby.lobby_uuid, "2");
        await db.setAddUser(lobby.lobby_uuid, "3");
        console.log(await db.getLobby(lobby.lobby_uuid));
        console.log(await db.getAllUsers());

        console.log("---------- Change host of a lobby");
        await db.setHost(lobby.lobby_uuid, "2");
        console.log(await db.getLobby(lobby.lobby_uuid));
        
        console.log("---------- Remove a player from a lobby");
        await db.setDeleteUser(lobby.lobby_uuid, "2");
        console.log(await db.getLobby(lobby.lobby_uuid));
        console.log(await db.getAllUsers());

        console.log("---------- Change password of a lobby");
        await db.setLobbyPassword(lobby.lobby_uuid, "azertyazerty");
        console.log(await db.getLobby(lobby.lobby_uuid));

        console.log("---------- Delete a lobby");
        await db.deleteLobby(lobby.lobby_uuid);
        console.log(await db.getAllLobbys());
        console.log(await db.getAllUsers());

        console.log("---------- Get all History");
        console.log(await db.getAllHistory());

        console.log("---------- Create a History");
        const users_id: string[] = ["1", "2"];
        const history: db.History = await db.putHistory(users_id);
        console.log(await db.getAllHistory());
        console.log(await db.getAllPlayerHistory());

        console.log("---------- Get a History");
        console.log(await db.getHistory(history.history_id));

        console.log("---------- Set history start");
        await db.setHistoryStart(history.history_id, new Date());
        console.log(await db.getHistory(history.history_id));

        console.log("---------- Set history end");
        await db.setHistoryEnd(history.history_id, new Date());
        console.log(await db.getHistory(history.history_id));

        console.log("---------- Set Score");
        await db.setPlayerScore(history.history_id, "1", 300);
        await db.setPlayerScore(history.history_id, "2", 69);
        console.log(await db.getPlayerHistory(history.history_id));

        console.log("---------- Get History from Player");
        console.log(await db.getHistoryFromUser("1"));

        console.log("---------- Get PlayerHistory from Player");
        console.log(await db.getPlayerHistoryFromUser("1"));

        console.log("---------- Delete a History/PlayerHistory (cleanup)");
        await db.PlayerHistory.query().delete().where("history_id", history.history_id);
        await db.History.query().deleteById(history.history_id);
        console.log(await db.getAllHistory());
        console.log(await db.getAllPlayerHistory());
        */
    });

LobbyManager.init(server, port);
