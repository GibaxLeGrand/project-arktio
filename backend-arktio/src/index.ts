import dotenv from "dotenv";
import express from 'express';
import * as http from 'http';
import db_connect from "./db_connect"
import { ChatServer } from './chat';

dotenv.config();

const app = express();
const server = http.createServer(app);

new ChatServer(server);

db_connect(process.env.NODE_ENV!)
    .finally(() => {
        console.log("Connexion à la BDD réussie !");
    });

console.log("Hello World");