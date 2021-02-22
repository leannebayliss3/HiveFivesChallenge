import {Model} from "mongoose";
import dayjs from "dayjs";
import {ObjectTypeComposer} from "graphql-compose";
import {IResolverParams} from "./IResolverParams";

export class CustomRecognitionResolvers {
    private mongooseModel: Model<any>;
    private readonly graphQlTC: ObjectTypeComposer;

    constructor(mongooseModel: Model<any>, graphQlTC: ObjectTypeComposer) {
        this.mongooseModel = mongooseModel;
        this.graphQlTC = graphQlTC;
    }

    loadCustomResolvers() {
        this.graphQlTC.addResolver({
            name: 'getRecognitions',
            args: {startDate: 'Date', endDate: 'Date'},
            type: [this.graphQlTC],
            resolve: async (resolverParams: { source: any, args: any }) => {
                return this.resolverFunc(resolverParams);
            }
        });
    }

    resolverFunc(resolverParams: IResolverParams) {
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
