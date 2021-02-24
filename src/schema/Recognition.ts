import {CustomResolvers} from "../resolvers/CustomResolvers";
import {Document, DocumentQuery, Model, Schema} from 'mongoose';
import {IResolverObject} from "./IResolverObject";
import {IResolverParams} from "../resolvers/IResolverParams";
import {MongooseModel} from "../models/MongooseModel";
import {ObjectTypeComposer} from "graphql-compose";
import {composeWithMongoose} from "graphql-compose-mongoose";

export class Recognition {
    readonly queryResolvers: IResolverObject;
    readonly mutationResolvers: IResolverObject;
    readonly graphQlModel: ObjectTypeComposer;
    readonly mongooseModel: Model<Document>;

    constructor() {
        // Set Models
        this.mongooseModel = new MongooseModel({
            modelName: 'Recognition',
            modelSchema: {
                senderId: Schema.Types.ObjectId,
                recipientId: Schema.Types.ObjectId,
                message: String
            },
            modelTCOpts: {}
        }).model;
        this.graphQlModel = composeWithMongoose(this.mongooseModel, {});

        this.loadCustomResolvers()

        // Create resolver objects
        this.queryResolvers = {
            getRecognitionById: this.graphQlModel.getResolver('findById'),
            getRecognitions: this.graphQlModel.getResolver('getRecognitions')
        }
        this.mutationResolvers = {
            recognitionCreateOne: this.graphQlModel.getResolver('createOne'),
        }
    }

    // Add the custom resolvers needed for the Recognition Model
    private loadCustomResolvers() {
        const customResolver = new CustomResolvers(this.graphQlModel);
        customResolver.addCustomResolver({
            name: 'getRecognitions',
            args: {senderId: 'String'},
            type: [this.graphQlModel],
            resolver: this.getRecognitions
        });
    }

    //
    // Custom resolver functions
    getRecognitions = async (resolverParams: IResolverParams): Promise<DocumentQuery<unknown[], Document, Record<string, unknown>>> => {
        let queryConditions: Record<string, unknown> | undefined;

        if (resolverParams.args.senderId) {
            queryConditions = {senderId: resolverParams.args.senderId}
        }

        return this.mongooseModel.find(queryConditions || {});
    }



}