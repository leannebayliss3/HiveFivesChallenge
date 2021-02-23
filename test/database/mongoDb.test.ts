import {MongoDb} from "../../src/database/mongoDb";
import {Connection} from "mongoose";
import dotenv from "dotenv";

describe('MongoDb connection', () => {

    describe('getInstance', () => {
        test('should exist', () => {
            expect(MongoDb.getInstance).toBeDefined();
        });
        test('should return a Promise of a Connection', () => {
            dotenv.config();

            const mongoInstance = MongoDb.getInstance();
            mongoInstance
                .then((connection: any) => {
                    expect(mongoInstance).toBeInstanceOf(Promise);
                    expect(connection).toBeInstanceOf(Connection);
                }).catch(error => {
                throw Error(`getInstance - Promise of Connection: ${error}`);
            })
        });
        test('should return the same object when called multiple times', () => {
            dotenv.config();

            jest.spyOn(MongoDb, 'getInstance');

            const mongoInstance = MongoDb.getInstance();
            const mongoInstance2 = MongoDb.getInstance();

            mongoInstance.then(() => {
                expect(MongoDb.getInstance).toHaveBeenCalledTimes(2);
                expect(mongoInstance).toEqual(mongoInstance2);
            }).catch(error => {
                throw Error(`getInstance - same object test: ${error}`);
            })
        });
        test('should throw an error when no database config is found', () => {
            const mongoInstance = MongoDb.getInstance();
            mongoInstance
                .then(() => {
                    throw Error(`getInstance - no db config: connection successfully established`);
                }).catch(error => {
                    expect(error).toEqual('DB_URI or PASSWORD cannot be undefined');
            })
        })
    })

});
