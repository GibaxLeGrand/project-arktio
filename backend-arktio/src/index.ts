import dotenv from "dotenv";
import express from 'express';
import * as http from 'http';
import { ChatServer } from './chat';
import { db_connect, db_disconnect } from "./db_connection"
import getUsers from "./get_users";

dotenv.config();

const app = express();
const server = http.createServer(app);

new ChatServer(server);

// Connexion à la BDD
db_connect(process.env.NODE_ENV!)
    .then(async (status) => {
        // Vérification de la connexion
        if (status[0]["Status"] != "OK") {
            db_disconnect();
            return;
        } else {
            console.log("Database Connected!")
        }
        // Appel d'une fonction asynchrone qui fait une requete dans la BDD
        console.log(await getUsers());
    });

console.log("Hello World");