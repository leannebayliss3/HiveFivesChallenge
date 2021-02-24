import {Document, Model} from 'mongoose';
import {IResolverObject} from "./IResolverObject";
import {MongooseModel} from "../models/MongooseModel";
import {ObjectTypeComposer} from "graphql-compose";
import {composeWithMongoose} from "graphql-compose-mongoose";

export class User {
    readonly queryResolvers: IResolverObject;
    readonly mutationResolvers: IResolverObject;
    readonly graphQlModel: ObjectTypeComposer;
    readonly mongooseModel: Model<Document>;

    constructor() {
        // Set Models
        this.mongooseModel = new MongooseModel({
            modelName: 'User',
            modelSchema: {
                firstName: String,
                lastName: String
            },
            modelTCOpts: {}
        }).model;

        this.graphQlModel = composeWithMongoose(this.mongooseModel, {});

        // Create resolver objects
        this.queryResolvers = {
            getUserById: this.graphQlModel.getResolver('findById'),
            getAllUsers: this.graphQlModel.getResolver('findMany')
        }

        this.mutationResolvers = {
            userCreateOne: this.graphQlModel.getResolver('createOne'),
        }
    }
}