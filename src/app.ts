import dotenv from "dotenv";
import express from 'express';
import * as expressGraphQl from 'express-graphql';

import {Recognition} from './Schema/recognition';
import {MongoDb} from "./database/mongoDb";

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

const app = express();
const port = process.env.PORT || 4000;

MongoDb.getInstance()
    .then(() => {
        app.use('/graphql', expressGraphQl.graphqlHTTP({
            schema: new Recognition().recognitionSchema,
            graphiql: true
        }))
        app.listen(port,
            (): void => console.log(`Express server running on ${port}`)
        );
    })
    .catch((error: Error): void => {
        throw error;
    })
;


