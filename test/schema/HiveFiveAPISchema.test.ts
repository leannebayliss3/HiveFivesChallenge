import {HiveFiveAPISchema} from "../../src/schema/HiveFiveAPISchema";
import {schemaComposer} from "graphql-compose";
import mongoose from "mongoose";

describe('HiveFiveAPISchema', () => {
    beforeEach(() => {
        delete mongoose.models['HiveFiveAPISchema'];
        delete mongoose.models['Recognition'];
        delete mongoose.models['User'];
        schemaComposer.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should exist', () => {
        expect(HiveFiveAPISchema).toBeDefined();
    });

    test('should add queries to the schema', () => {
        const querySpy = spyOn(schemaComposer.Query, 'addFields').and.callThrough();
        new HiveFiveAPISchema();

        const queryNames: string[] = Object.keys(querySpy.calls.argsFor(0)[0]);

        expect(querySpy).toHaveBeenCalled();
        expect(queryNames.length).toEqual(4);
        expect(queryNames).toEqual([
            'getRecognitionById',
            'getRecognitions',
            'getUserById',
            'getAllUsers'
        ]);
    })

    test('should add mutations to the schema', () => {
        const mutationSpy = spyOn(schemaComposer.Mutation, 'addFields').and.callThrough();
        new HiveFiveAPISchema();

        const mutationNames: string[] = Object.keys(mutationSpy.calls.argsFor(0)[0]);

        expect(mutationSpy).toHaveBeenCalled();
        expect(mutationNames.length).toEqual(2);
        expect(mutationNames).toEqual([
            'recognitionCreateOne',
            'userCreateOne'
        ]);
    })

    test('should return compiled graphQL schema for the API', () => {
        expect(new HiveFiveAPISchema().apiSchema).toBeDefined();
    });

});