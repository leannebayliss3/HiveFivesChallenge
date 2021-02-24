import {CustomResolvers} from "../../src/resolvers/CustomResolvers";
import {Recognition} from "../../src/schema/Recognition";
import {ObjectTypeComposer, schemaComposer} from "graphql-compose";
import mongoose from "mongoose";
import {IResolverParams} from "../../src/resolvers/IResolverParams";

describe('RecognitionResolvers', () => {
    beforeEach(() => {
        delete mongoose.models['Recognition'];
        schemaComposer.clear();
        jest.clearAllMocks();
    });

    test('should exist', () => {
        expect(Recognition).toBeDefined();
    });

    test('should create Mongoose model', () => {
        const modelSpy = spyOn(mongoose, 'model').and.callThrough();
        const recognition = new Recognition();
        expect(modelSpy).toHaveBeenCalledTimes(1);
        expect(recognition.mongooseModel).toBeDefined();
    })

    test('should create GraphQL model', () => {
        const recognition = new Recognition();
        expect(recognition.graphQlModel).toBeDefined();
    })

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

    test('should set mutationResolver object containing the queries for GraphQL', () => {
        spyOn(ObjectTypeComposer.prototype, 'getResolver').and.callThrough();
        const recognition = new Recognition();
        expect(Object.keys(recognition.mutationResolvers)).toEqual(['recognitionCreateOne']);
        expect(Object.keys(recognition.mutationResolvers).length).toEqual(1);
        expect(ObjectTypeComposer.prototype.getResolver).toHaveBeenCalled();
    });

    describe('getRecognitions function', () => {
        const recognition = new Recognition();

        test('should exist', () => {
            expect(recognition.getRecognitions).toBeDefined();
        })

        test('should call mongoose.find with an empty object if no dates are provided', () => {
            let options: IResolverParams = {
                source: {},
                args: {}
            };

            const mongooseFind = spyOn(recognition.mongooseModel, 'find').and.stub();
            recognition.getRecognitions(options);

            expect(mongooseFind).toHaveBeenCalledTimes(1);
            expect(mongooseFind).toHaveBeenCalledWith({});
        });

        test('should call mongoose.find with dates if provided in DD-MM-YYYY format', () => {
            let options: IResolverParams ={
                source: {},
                args: {
                    startDate: '20-02-2021',
                    endDate: '23-02-2021'
                }
            };
            let queryConditions = {
                $and: [
                    {createdDate: {$gte: "2021-02-20T00:00:00+00:00" }},
                    {createdDate: {$lte: "2021-02-23T00:00:00+00:00" }},
                ]
            }

            const mongooseFind = spyOn(recognition.mongooseModel, 'find').and.stub();
            recognition.getRecognitions(options);

            expect(mongooseFind).toHaveBeenCalledTimes(1);
            expect(mongooseFind).toHaveBeenCalledWith(queryConditions);

        });

        test('should call mongoose.find with dates if provided in YYYY-MM-DD format', () => {
            let options: IResolverParams ={
                source: {},
                args: {
                    startDate: '2021-02-20',
                    endDate: '2021-02-23'
                }
            };
            let queryConditions = {
                $and: [
                    {createdDate: {$gte: "2021-02-20T00:00:00+00:00" }},
                    {createdDate: {$lte: "2021-02-23T00:00:00+00:00" }},
                ]
            }

            const mongooseFind = spyOn(recognition.mongooseModel, 'find').and.stub();
            recognition.getRecognitions(options);

            expect(mongooseFind).toHaveBeenCalledTimes(1);
            expect(mongooseFind).toHaveBeenCalledWith(queryConditions);

        });

    })

});