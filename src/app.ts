import {MongoDb} from "./database/mongoDb";
import dotenv from "dotenv";
import express from 'express';
import {Connection} from "mongoose";

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

const app = express();
const port = process.env.PORT || 4000;

MongoDb.getInstance()
    .then((connection: Connection) => {
        connection.on('error', console.log)
            .on('open', (): void => {
                app.listen(port,
                    (): void => console.log(`Express server running on ${port}`));
            })
    })
    .catch((error: Error): void => {
        throw error;
    })
;


