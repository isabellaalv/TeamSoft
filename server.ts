// import "reflect-metadata";
// import express from "express";
// import "express-async-errors";

// import "dotenv/config";

// import "./database";
// import "./shared/container";
// import { routes } from "./routes";
import express from "express";
import "./db/config";
const server = express();
import "reflect-metadata";
import { routes } from "./routes";
import dotenv from "dotenv";



dotenv.config()

//usar,liberar o req.body
server.use(express.json())

const app = express();

app.use(express.json());

//Rotas
server.use(routes)

const {PORT} = process.env;

server.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`))