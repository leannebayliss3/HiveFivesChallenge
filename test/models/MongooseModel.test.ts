import mongoose from "mongoose";
import {schemaComposer} from "graphql-compose";
import {MongooseModel} from "../../src/models/MongooseModel";

describe('MongooseModel', () => {
    let modelOptions: { modelName: string, modelSchema: Record<string, unknown>, modelTCOpts: Record<string, unknown> }
    beforeAll(() => {
        modelOptions = {
            modelName: 'TestModel',
            modelSchema:
                {name: String, likesMarmite: Boolean,},
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
    test('should create mongoose schema', () => {
        const schemaSpy = spyOn(mongoose, 'Schema').and.callThrough();
        new MongooseModel(modelOptions);

        expect(schemaSpy).toHaveBeenCalledTimes(1);
        expect(schemaSpy).toHaveBeenCalledWith(modelOptions.modelSchema, {timestamps: true});
    });
    test('should create mongoose model', () => {
        const mySpy = spyOn(mongoose, 'model').and.callThrough();
        const TestModel = new MongooseModel(modelOptions);

        expect(mySpy).toHaveBeenCalled();
        expect(TestModel.model).toBeDefined();
        expect(TestModel.model.schema.obj).toEqual(modelOptions.modelSchema);

    });
})