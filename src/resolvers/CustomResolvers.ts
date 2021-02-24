import {Document, DocumentQuery} from 'mongoose';
import {ObjectTypeComposer} from "graphql-compose";

import {ICustomResolver} from "./ICustomResolver";
import {IResolverParams} from './IResolverParams';

export class CustomResolvers {
    private readonly graphQLModel: ObjectTypeComposer;

    constructor(graphQLModel: ObjectTypeComposer) {
        this.graphQLModel = graphQLModel;
    }

    addCustomResolver(customResolver: ICustomResolver): void {
        this.graphQLModel.addResolver({
            name: customResolver.name,
            args: customResolver.args,
            type: customResolver.type,
            resolve: async (resolverParams: IResolverParams): Promise<DocumentQuery<unknown[], Document, Record<string, unknown>>> => {
                return customResolver.resolver(resolverParams);
            }
        });
    }

}