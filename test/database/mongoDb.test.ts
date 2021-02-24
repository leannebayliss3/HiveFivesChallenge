import {MongoDb} from '../../src/database/mongoDb';
import mongoose from 'mongoose';
import Spy = jasmine.Spy;

describe('mongoDb', () => {

    describe('getInstance', () => {
        let getInstanceSpy: Spy;

        beforeEach(() => {
            getInstanceSpy = spyOn(MongoDb, 'getInstance').and.callThrough();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should exist', () => {
            expect(MongoDb.getInstance).toBeDefined();
        });

        test('should call connect with db url and options', () => {
            process.env.DB_URI = 'mock-db-url:<password>';
            process.env.PASSWORD = '123456';

            const connectSpy = spyOn(mongoose, 'connect').and.returnValue(Promise.resolve());
            MongoDb.getInstance();

            expect(connectSpy.calls.argsFor(0)).toEqual(['mock-db-url:123456', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }]);

        });
        test('should return the same object when called multiple times', () => {
            process.env.DB_URI = 'mock-db-url:<password>';
            process.env.PASSWORD = '123456';
            spyOn(mongoose, 'connect');

            const mongoInstance = MongoDb.getInstance();
            const mongoInstance2 = MongoDb.getInstance();

            expect(getInstanceSpy).toHaveBeenCalledTimes(2);
            expect(mongoInstance).toStrictEqual(mongoInstance2);

        });
        test('should throw an error when no database config is found', () => {
            const connectSpy = spyOn(mongoose, 'connect');
            try {
                MongoDb.getInstance();
            } catch (e) {
                expect(connectSpy).not.toHaveBeenCalled();
                expect(e).toEqual(new TypeError('DB_URI or PASSWORD cannot be undefined'));
            }
        });
    });

});
