//Compile all resolvers here.
import {schemaComposer} from "graphql-compose";
import {GraphQLSchema} from "graphql";
import {Recognition} from "./Recognition";
import {User} from "./User";

export class HiveFiveAPISchema {
    readonly apiSchema: GraphQLSchema;
    private Recognition: Recognition;
    private User: User;

    constructor() {
        // Load Resolvers
        this.Recognition = new Recognition();
        this.User = new User();

        // Build API Schema
        this.apiSchema = this.buildGraphQlSchema();
    }

    private buildGraphQlSchema() {
        schemaComposer.Query.addFields(
            {
                ...this.Recognition.queryResolvers,
                ...this.User.queryResolvers
            }
        )

        schemaComposer.Mutation.addFields({
                ...this.Recognition.mutationResolvers,
                ...this.User.mutationResolvers
            }
        );

        return schemaComposer.buildSchema();
    }

    get recognitionSchema() {
        return this.apiSchema
    }
}