import {ObjectTypeComposer} from "graphql-compose";
import {Model} from "mongoose";
import {IResolverParams} from "./IResolverParams";

export class CustomResolvers {
    private readonly graphQLModel: ObjectTypeComposer;

    constructor(graphQLModel: ObjectTypeComposer,) {
        this.graphQLModel = graphQLModel;
    }

    addCustomResolver(name: string, args: {}, resolver: (params: IResolverParams) => Model<any>){
        this.graphQLModel.addResolver({
            name: name,
            args: args,
            type: this.graphQLModel,
            resolve: async (resolverParams: { source: any, args: any }) => {
                return resolver(resolverParams)
            }
        });
    }

}