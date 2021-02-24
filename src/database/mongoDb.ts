import mongoose, {Connection} from 'mongoose';

export class MongoDb {
    private static _instance: Promise<Connection>;

    static getInstance(): Promise<Connection> {
        if (!MongoDb._instance) {

            return MongoDb._instance = new MongoDb().connect();


        }
        return MongoDb._instance;
    }

    private connect(): Promise<Connection> {
        if (process.env.DB_URI && process.env.PASSWORD) {
            const uri = process.env.DB_URI.replace('<password>', process.env.PASSWORD);
            return new Promise((resolve) => {
                mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
                    .then(() => {
                        resolve(mongoose.connection);
                    });
            });
        } else {
            throw new TypeError('DB_URI or PASSWORD cannot be undefined');
        }
    }
}

