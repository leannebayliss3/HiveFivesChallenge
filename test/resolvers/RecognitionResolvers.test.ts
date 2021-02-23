import {CustomResolvers} from "../../src/resolvers/CustomResolvers";
import {Recognition} from "../../src/schema/Recognition";
import {ObjectTypeComposer, schemaComposer} from "graphql-compose";
import * as mongoose from "mongoose";
import {IResolverParams} from "../../src/resolvers/IResolverParams";
import dayjs from "dayjs";


describe('RecognitionResolvers', () => {
    afterEach(() => {
        delete mongoose.models['Recognition'];
        schemaComposer.clear();
        jest.clearAllMocks();
    });

    test('should exist', () => {
        expect(Recognition).toBeDefined();
    });

    test('should create custom resolvers on the model', () => {
        spyOn(CustomResolvers.prototype, 'addCustomResolver').and.callThrough();
        new Recognition();
        expect(CustomResolvers.prototype.addCustomResolver).toHaveBeenCalledTimes(1);
    })
    test('should set queryResolver object containing the queries for GraphQL', () => {
        spyOn(ObjectTypeComposer.prototype, 'getResolver').and.callThrough();
        const recognition = new Recognition();
        expect(Object.keys(recognition.queryResolvers)).toEqual(['getRecognitionById', 'getRecognitions']);
        expect(Object.keys(recognition.queryResolvers).length).toEqual(2);
        expect(ObjectTypeComposer.prototype.getResolver).toHaveBeenCalled();
    });

    describe('getRecognitions function', () => {
        const recognition = new Recognition();
        test('should exist', () => {
            expect(recognition.getRecognitions).toBeDefined();
        })

        test('should call mongoose.find with an empty object if no dates are provided', () => {
            let options: IResolverParams ={
                source: {},
                args: {}
            };
            const mongooseFind = spyOn(recognition.mongooseModel, 'find').and.stub();
            recognition.getRecognitions(options);
            expect(mongooseFind).toHaveBeenCalledTimes(1);
            expect(mongooseFind).toHaveBeenCalledWith({});
        });

        test('should call mongoose.find with the start and end date if provided', () => {
            let options: IResolverParams ={
                source: {},
                args: {
                    startDate: '20-02/2021',
                    endDate: '23-02/2021'
                }
            };

            let queryConditions = {
                $and: [
                    {createdDate: {$gte: dayjs(options.args.startDate).format()}},
                    {createdDate: {$lte: dayjs(options.args.endDate).format()}},
                ]
            }

            const mongooseFind = spyOn(recognition.mongooseModel, 'find').and.stub();
            recognition.getRecognitions(options);
            expect(mongooseFind).toHaveBeenCalledTimes(1);
            expect(mongooseFind).toHaveBeenCalledWith(queryConditions);
        });

    })

});