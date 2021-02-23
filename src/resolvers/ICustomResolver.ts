import {IResolverParams} from "./IResolverParams";
import {DocumentQuery} from "mongoose";

export interface ICustomResolver {
    name: string,
    args: {
        [key: string] : any
    },
    type: any,
    resolver: (resolverParams: IResolverParams) => Promise<DocumentQuery<any[], any, {}>>
}