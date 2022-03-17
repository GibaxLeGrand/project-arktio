import express from 'express';
import dotenv from "dotenv";
import http from 'http';
import apiRoute from "./routes/apiRoute";
import bodyParser from "body-parser";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { ChatServer } from './chat';
import * as db from './bdd';
import {hash_password} from "./scripts/security/password";

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


const fs = require('fs');

fs.readdirSync("../frontend-arktio/public").forEach((file: any) => {
    console.log(file);
});

// Link Front
app.use("/", express.static("../frontend-arktio/public/"))

// Api
app.use("/api", apiRoute);

// Execute listen so last thing to execute
new ChatServer(server);

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
        console.log(await db.getUser(17));
        console.log(await db.getUserAuthentificate("c@gmail.com"));
        try {
            console.log(await db.putUser("toto", "c@c.com", hash_password("aaaaaaa")));
        } catch (err: any) {
            console.log(err);
        }
    });

app.use((err: any, req: any, res: any, next: any) => {
    db.errorHandler(err, res);
});

console.log("Hello World");