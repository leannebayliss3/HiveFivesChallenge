//Compile all resolvers here.
import {ObjectTypeComposer, schemaComposer} from "graphql-compose";
import {GraphQLSchema} from "graphql";

import {RecognitionQLSchema} from "./RecognitionQLSchema";
import {MongooseModel} from "../models/MongooseModel";
import {RecognitionResolvers} from "../resolvers/RecognitionResolvers";

export class HiveFiveAPISchema {
    private readonly _recognitionSchema: GraphQLSchema;
    private readonly graphQlTC: ObjectTypeComposer;
    private recognitionResolvers: RecognitionResolvers;
    constructor() {
        // Create Models
        const recognitionModel = new MongooseModel({
            modelName: 'Recognition',
            modelSchema: {
                sender: String,
                recipient: String,
                message: String
            },
            modelTCOpts: {}
        }).model;

        // Create graphQLModel
        this.graphQlTC = new RecognitionQLSchema(recognitionModel, {}).graphQlTC;

        // Load Resolvers
        this.recognitionResolvers = new RecognitionResolvers(recognitionModel, this.graphQlTC);

        // Build API Schema
        this._recognitionSchema = this.buildGraphQlSchema()
    }

    private buildGraphQlSchema() {
        schemaComposer.Query.addFields(
            {
                ...this.recognitionResolvers.queryResolvers
            }
        )

        schemaComposer.Mutation.addFields({
                ...this.recognitionResolvers.mutationResolvers
            }
        );

        return schemaComposer.buildSchema();
    }

    get recognitionSchema() {
        return this._recognitionSchema
    }
}