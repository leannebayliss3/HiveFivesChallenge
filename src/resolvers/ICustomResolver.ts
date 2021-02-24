import {DocumentQuery} from "mongoose";
import {IResolverParams} from "./IResolverParams";

export interface ICustomResolver {
    name: string,
    args: {
        [key: string] : any
    },
    type: any,
    resolver: (resolverParams: IResolverParams) => Promise<DocumentQuery<any[], any, {}>>
}