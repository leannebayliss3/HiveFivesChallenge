import mongoose from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {schemaComposer} from 'graphql-compose';
import {GraphQLSchema} from "graphql";

export class Recognition {
    private readonly _recognitionSchema: GraphQLSchema;

    constructor() {
        const schema = new mongoose.Schema({
            sender: String,
            recipient: String,
            message: String,
            createdDate: String,
        });
        const recognition = mongoose.model('Recognition', schema);
        const recognitionTC = composeMongoose(recognition, {});
        schemaComposer.Query.addFields({
            recognitionById: recognitionTC.mongooseResolvers.findById(),
        })

        schemaComposer.Mutation.addFields({
            recognitionCreateOne: recognitionTC.mongooseResolvers.createOne()
        });

        this._recognitionSchema = schemaComposer.buildSchema();
    }

    get recognitionSchema() {
        return this._recognitionSchema
    }

}
