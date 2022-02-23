import "reflect-metadata";
import express from "express";
import "express-async-errors";

import "dotenv/config";

import "./database";
import "./shared/container";
import { routes } from "./routes";


const app = express();

app.use(express.json());
app.use(routes);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));