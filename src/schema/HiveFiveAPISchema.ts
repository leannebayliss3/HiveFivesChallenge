//Compile all resolvers here.
import {schemaComposer} from "graphql-compose";
import {GraphQLSchema} from "graphql";
import {Recognition} from "./Recognition";

export class HiveFiveAPISchema {
    private readonly _recognitionSchema: GraphQLSchema;
    private recognitionResolvers: Recognition;

    constructor() {
        // Load Resolvers
        this.recognitionResolvers = new Recognition();

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