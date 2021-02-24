import {ObjectTypeComposer, schemaComposer} from "graphql-compose";
import {User} from "../../src/schema/User";
import mongoose from "mongoose";



describe('User', () => {
    beforeEach(() => {
        delete mongoose.models['User'];
        schemaComposer.clear();
        jest.clearAllMocks();
    });
    afterEach(() => {
        delete mongoose.models['User'];
        schemaComposer.clear();
    })

    test('should exist', () => {
        expect(User).toBeDefined();
    });

    test('should create Mongoose model', () => {
        const modelSpy = spyOn(mongoose, 'model').and.callThrough();
        const user = new User();
        expect(modelSpy).toHaveBeenCalledTimes(1);
        expect(user.mongooseModel).toBeDefined();
    })

    test('should create GraphQL model', () => {
        const user = new User();
        expect(user.graphQlModel).toBeDefined();
    })

    test('should set queryResolvers object containing the queries for GraphQL', () => {
        spyOn(ObjectTypeComposer.prototype, 'getResolver').and.callThrough();
        const user = new User();
        expect(Object.keys(user.queryResolvers)).toEqual(['getUserById', 'getAllUsers']);
        expect(Object.keys(user.queryResolvers).length).toEqual(2);
        expect(ObjectTypeComposer.prototype.getResolver).toHaveBeenCalled();
    });

    test('should set mutationResolvers object containing the queries for GraphQL', () => {
        spyOn(ObjectTypeComposer.prototype, 'getResolver').and.callThrough();
        const user = new User();
        expect(Object.keys(user.mutationResolvers)).toEqual(['userCreateOne']);
        expect(Object.keys(user.mutationResolvers).length).toEqual(1);
        expect(ObjectTypeComposer.prototype.getResolver).toHaveBeenCalled();
    });

});