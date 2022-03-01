import dotenv from "dotenv";
import db_connect from "./db_connect"

dotenv.config();

db_connect(process.env.NODE_ENV!)
    .finally(() => {
        console.log("Connexion à la BDD réussie !");
    });

console.log("Hello World");