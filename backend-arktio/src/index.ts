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
        const toto = await db.getAllUsers();
        console.log(toto[0].user_name)
        console.log(await db.getUser(1));
        console.log(await db.getUser("c@gmail.com", "chopatate"));
        console.log(await db.putUser("toto", "c@c.com", "aaaaaaa"));
    });

console.log("Hello World");