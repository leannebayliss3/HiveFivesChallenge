import mongoose, {Connection} from 'mongoose';

export class MongoDb {
    private static _instance: Promise<Connection>;

    private constructor() {
    }

    static getInstance(): Promise<Connection> {
        if (!MongoDb._instance) {
            return MongoDb._instance = new MongoDb().connect();
        }
        return MongoDb._instance;
    }

    private connect(): Promise<Connection> {
        return new Promise((resolve, reject) => {
            if (process.env.DB_URI && process.env.PASSWORD) {
                const uri = process.env.DB_URI.replace('<password>', process.env.PASSWORD)
                mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
                    resolve(mongoose.connection);
                });
            } else {
                reject(new TypeError('DB_URI or PASSWORD cannot be undefined'));
            }
        })
    }
}

