import {CustomResolvers} from "../../src/resolvers/CustomResolvers";
import {MongooseModel} from "../../src/models/MongooseModel";
import {GraphQLModel} from "../../src/schema/GraphQLModel";
import {IResolverParams} from "../../src/resolvers/IResolverParams";

import {Model} from "mongoose";
import {ObjectTypeComposer} from "graphql-compose";
import Spy = jasmine.Spy;

describe('CustomResolvers', () => {
    let TestModel: Model<any>;
    let TestQlModel: ObjectTypeComposer;
    let testResolvers: CustomResolvers;
    let testFunction: (opts: IResolverParams) => Model<any>;
    let addResolverSpy: Spy;

    beforeAll(() => {
        const modelOptions = {
            modelName: 'TestModel',
            modelSchema:
                {name: String, likesMarmite: Boolean},
            modelTCOpts: {}
        }
        TestModel = new MongooseModel(modelOptions).model
        TestQlModel = new GraphQLModel(TestModel, modelOptions.modelTCOpts).graphQlTC
        testResolvers = new CustomResolvers(TestQlModel);
        testFunction = () => {
            return new TestModel({name: 'Leanne', likesMarmite: false});
        };
    });

    beforeEach(() => {
        addResolverSpy = spyOn(TestQlModel, 'addResolver').and.callThrough();
        testResolvers.addCustomResolver('testResolver', {}, testFunction);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should exist', () => {
        expect(CustomResolvers).toBeDefined();
    });

    test('should set new custom resolver on model', () => {
        expect(() => {
            TestQlModel.getResolver('testResolver')
        }).not.toThrow(new Error('Type TestModel does not have resolver with name \'testResolver\''));

        expect(TestQlModel.getResolver('testResolver')).toBeDefined();
    });

    test('should call the addResolver function', () => {
        // testResolvers.addCustomResolver('testResolver',{} ,testFunction);
        expect(addResolverSpy).toHaveBeenCalledTimes(1);
    });

    test('should call the addResolver function with params', () => {
        // testResolvers.addCustomResolver('testResolver', {},testFunction);
        const args = addResolverSpy.calls.first().args[0];

        expect(addResolverSpy).toHaveBeenCalledTimes(1);
        expect(args.name).toEqual('testResolver');
        expect(args.resolve).toBeInstanceOf(Function);
        expect(args.args).toEqual({});
        expect(args.type).toEqual(TestQlModel);
    });
})