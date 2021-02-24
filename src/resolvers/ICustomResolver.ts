import {Document, DocumentQuery} from 'mongoose';
import {IResolverParams} from './IResolverParams';
import {ResolverDefinition} from 'graphql-compose/lib/Resolver';

export interface ICustomResolver extends ResolverDefinition<unknown, unknown> {
    resolver: (resolverParams: IResolverParams) => Promise<DocumentQuery<unknown[], Document, Record<string, unknown>>>
}