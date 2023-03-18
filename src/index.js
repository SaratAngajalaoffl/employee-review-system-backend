import dotenv from "dotenv";

// loading config from .env files
dotenv.config();

import express from "express";
import cors from "cors";

import router from "./routes/main-router.js";
import { establishconnection } from "./utils/db-connection-utils.js";

// setting default port if not available in .env
const PORT = process.env.PORT || 8000;

// initiating the app
const app = express();

// Db Connection
establishconnection();

// MiddleWare
app.use(express.static("public"));
app.use(cors());
app.use(express.json()); // parse JSON body if exists

app.use("/", router); // setup the main router

app.get("/api", (_, res) => res.status(200).send("Polling API"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

export default app;
