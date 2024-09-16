import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import { config } from "./config";
import requestLogger from "./middleware/requestLogger";
import TrackEventRoutes from "./routes/TrackEventRoutes";

const app = express();

mongoose
    .connect(config.mongo.uri)
    .then(() => {
        console.log("Server connected to MongoDB");
        StartServer();
    })
    .catch((error) => {
        console.error("Unable to connect to MongoDB:");
        console.error(error);
    });

const StartServer = () => {
    app.use(requestLogger);
    app.use(cors(config.cors));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "..", "public")));

    app.get(["/:page(1.html|2.html|3.html)"], (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });

    app.use("/", TrackEventRoutes);

    app.use((req, res, next) => {
        const error = new Error("URL not found");
        console.error(error);
        return res.status(404).json({ message: error.message });
    });

    app.listen(config.sever.trackerPort, () => {
        console.log(
            `Server is running on http://localhost:${config.sever.trackerPort}`
        );
    });

    app.listen(config.sever.htmlPort, () => {
        console.log(
            `Serving HTML pages on http://localhost:${config.sever.htmlPort}`
        );
    });
};
