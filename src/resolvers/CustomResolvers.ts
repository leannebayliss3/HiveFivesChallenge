import {ObjectTypeComposer} from "graphql-compose";

import {ICustomResolver} from "./ICustomResolver";

export class CustomResolvers {
    private readonly graphQLModel: ObjectTypeComposer;

    constructor(graphQLModel: ObjectTypeComposer) {
        this.graphQLModel = graphQLModel;
    }

    addCustomResolver(customResolver: ICustomResolver){
        this.graphQLModel.addResolver({
            name: customResolver.name,
            args: customResolver.args,
            type: customResolver.type,
            resolve: async (resolverParams: { source: any, args: any }) => {
                return customResolver.resolver(resolverParams);
            }
        });
    }

}