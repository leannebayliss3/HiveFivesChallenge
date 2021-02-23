import {Model} from "mongoose";
import {ObjectTypeComposer} from "graphql-compose";
import {CustomResolvers} from "../resolvers/CustomResolvers";
import {TResolverParams} from "../resolvers/TResolverParams";
import dayjs from "dayjs";
import {MongooseModel} from "../models/MongooseModel";
import {composeWithMongoose} from "graphql-compose-mongoose";
import {IResolverObject} from "./IResolverObject";

export class Recognition {
    readonly queryResolvers: IResolverObject;
    readonly mutationResolvers: IResolverObject;
    readonly graphQlTC: ObjectTypeComposer;
    readonly mongooseModel: Model<any>;

    constructor() {
        // Set Models
        this.mongooseModel = new MongooseModel({
            modelName: 'Recognition',
            modelSchema: {
                sender: String,
                recipient: String,
                message: String
            },
            modelTCOpts: {}
        }).model;

        console.log(this.mongooseModel);
        this.graphQlTC = composeWithMongoose(this.mongooseModel, {});

        this.loadCustomResolvers()

        // Create resolver objects
        this.queryResolvers = {
            getRecognitionById: this.graphQlTC.getResolver('findById'),
            getRecognitions: this.graphQlTC.getResolver('getRecognitions')
        }
        this.mutationResolvers = {
            recognitionCreateOne: this.graphQlTC.getResolver('createOne'),
        }
    }

    // Add the custom resolvers needed for the Recognition Model
    private loadCustomResolvers() {
        const customResolver = new CustomResolvers(this.graphQlTC);
        customResolver.addCustomResolver({
            name: 'getRecognitions',
            args: {startDate: 'Date', endDate: 'Date'},
            resolver: this.getRecognitions
        });
    }

    // Custom resolver functions
    getRecognitions(resolverParams: TResolverParams) {
        let queryConditions: {} | undefined;

        if (resolverParams.args.startDate && resolverParams.args.endDate) {
            queryConditions = {
                $and: [
                    {createdDate: {$gte: dayjs(resolverParams.args.startDate).format()}},
                    {createdDate: {$lte: dayjs(resolverParams.args.endDate).format()}},
                ]
            }
        }
        return this.mongooseModel.find(queryConditions || {});
    }
}