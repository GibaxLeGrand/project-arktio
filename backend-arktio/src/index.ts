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
            console.log(await db.getUser("5"));
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
            console.log("Insertion réussie");   
        } catch (error: any) {
            // Quelques exemples pour traiter les erreurs
            if (error instanceof db.ConstraintViolationError)
                console.log("Erreur : utilisateur existe déja")
            else if (error instanceof db.UniqueViolationError)
                console.log("Erreur : contrainte unique violée");
        }

        try {
            console.log(await db.setUsername("4", "test123456"));
        } catch (error: any) {
            console.log("Erreur de merde");
        }
    });

new LobbyManager(server, port);
