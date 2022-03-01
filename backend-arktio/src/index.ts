import { ChatServer } from './chat';
import express from 'express';
import * as http from 'http';
import loginRoute from "./routes/loginRoute";

// Init http server
const app = express();
const server = http.createServer(app);


// Login Routes
app.use("/login", loginRoute);

// Execute listen so last thing to execute
new ChatServer(server);