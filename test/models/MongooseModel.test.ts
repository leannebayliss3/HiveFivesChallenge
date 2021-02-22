import mongoose, {model} from "mongoose";
import {ObjectTypeComposer, schemaComposer} from "graphql-compose";
import {MongooseModel} from "../../src/models/MongooseModel";

describe('MongooseModel', () => {
    let modelOptions : { modelName: string, modelSchema: {}, modelTCOpts: {} }
    beforeAll(() => {
        modelOptions = {
            modelName: 'TestModel',
            modelSchema: {
                name: String,
                likesMarmite: Boolean
            },
            modelTCOpts: {}
        }
    })
    afterEach(() => {
        delete mongoose.connection.models['TestModel'];
        schemaComposer.clear();
    })
    test('should exist', () => {
        expect(MongooseModel).toBeDefined();
    });
    test('should call mongoose schema', () => {
        let schemaSpy = spyOn(mongoose, 'Schema').and.callThrough();
        new MongooseModel(modelOptions);

        expect(schemaSpy).toHaveBeenCalledTimes(1);
        expect(schemaSpy).toHaveBeenCalledWith(modelOptions.modelSchema);
    });
    test('should create mongoose model', () => {
        let mySpy = spyOn(mongoose, 'model').and.callThrough();
        const TestModel = new MongooseModel(modelOptions);

        expect(mySpy).toHaveBeenCalled();
        expect(TestModel.model).toBeDefined();
        expect(TestModel.model.schema.obj).toEqual(modelOptions.modelSchema);

    });
    test('should create graphQL ObjectTypeComposer model', () => {
        const TestModel = new MongooseModel(modelOptions);
        expect(TestModel.modelTC).toBeDefined();
        expect(TestModel.modelTC).toBeInstanceOf(ObjectTypeComposer);

    });
})