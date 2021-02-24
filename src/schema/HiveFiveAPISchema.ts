//Compile all resolvers here.
import {GraphQLSchema} from "graphql";
import {Recognition} from "./Recognition";
import {User} from "./User";
import {schemaComposer} from "graphql-compose";

export class HiveFiveAPISchema {
    readonly apiSchema: GraphQLSchema;
    private Recognition: Recognition;
    private User: User;

    constructor() {
        // Load Resolvers
        this.Recognition = new Recognition();
        this.User = new User();

        // Create new relationship between recognitions and users
        this.Recognition.graphQlModel.addFields({
            sender: {
                type: this.User.graphQlModel,
                resolve: async (options: Record<string, unknown>) => {
                    return this.User.mongooseModel.findOne({ _id: options.senderId });
                }
            },
            recipient: {
                type: this.User.graphQlModel,
                resolve: async (options: Record<string, unknown>) => {
                    return this.User.mongooseModel.findOne({ _id: options.recipientId });
                }
            }
        });

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
}