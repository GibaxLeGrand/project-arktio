import dotenv from "dotenv";
import express from 'express';
import * as http from 'http';
import { ChatServer } from './chat';
import * as db from './bdd';

dotenv.config();

const app = express();
const server = http.createServer(app);

new ChatServer(server);

// Connexion à la BDD
db.connect(process.env.NODE_ENV!)
    .then(async (status) => {
        // Vérification de la connexion
        if (status[0]["Status"] != "OK") {
            db.disconnect();
            return;
        } else {
            console.log("Database Connected!")
        }
        // Appel d'une fonction asynchrone qui fait une requete dans la BDD
        // console.log(await db.getAllUsers());
        // console.log(await db.getUser(1));
        // console.log(await db.getUser("c@gmail.com", "chopatate"));
        const toto = await db.putUser("toto", "b@b.com", "aaaa");
        console.log(toto.toJSON())
    });

console.log("Hello World");