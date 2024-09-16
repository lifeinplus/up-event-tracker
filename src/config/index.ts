import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";
const MONGO_AUTH_SOURCE = process.env.MONGO_AUTH_SOURCE || "";

export const config = {
    cors: {
        origin: "http://localhost:50000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
        // maxAge: 600,
    },
    mongo: {
        uri: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB_NAME}?authSource=${MONGO_AUTH_SOURCE}`,
    },
    sever: {
        trackerPort: 8888,
        htmlPort: 50000,
    },
};
