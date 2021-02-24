import {DocumentQuery, Model, Schema} from "mongoose";
import {ObjectTypeComposer} from "graphql-compose";
import {CustomResolvers} from "../resolvers/CustomResolvers";
import {IResolverParams} from "../resolvers/IResolverParams";
import dayjs from "dayjs";
import {MongooseModel} from "../models/MongooseModel";
import {composeWithMongoose} from "graphql-compose-mongoose";
import {IResolverObject} from "./IResolverObject";
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export class Recognition {
    readonly queryResolvers: IResolverObject;
    readonly mutationResolvers: IResolverObject;
    readonly graphQlModel: ObjectTypeComposer;
    readonly mongooseModel: Model<any>;

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
            args: {startDate: 'Date', endDate: 'Date'},
            type: [this.graphQlModel],
            resolver: this.getRecognitions
        });
    }

    // Custom resolver functions
    getRecognitions = async (resolverParams: IResolverParams): Promise<DocumentQuery<any[], any, {}>> => {
        const dateFormat: string[] = ['DD-MM-YYYY', 'YYYY-MM-DD'];

        let queryConditions: {} | undefined;

        if (resolverParams.args.startDate && resolverParams.args.endDate) {
            queryConditions = {
                $and: [
                    {createdDate: {$gte: dayjs(resolverParams.args.startDate, dateFormat).format()}},
                    {createdDate: {$lte: dayjs(resolverParams.args.endDate, dateFormat).format()}},
                ]
            }
        }
        return this.mongooseModel.find(queryConditions || {});
    }



}