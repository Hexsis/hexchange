import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema } from 'graphql';
import { directiveResolvers } from '../graphql/directive';

const stitchSchema = (): GraphQLSchema => {
    const typesArray = [
        ..._loadApiSchemas(),
        ..._loadCommonSchemas()
    ];
    const resolversArray = [
        ..._loadApiResolvers(),
        ..._loadCommonResolvers()
    ];
    return makeExecutableSchema({
        typeDefs: mergeTypeDefs(typesArray),
        resolvers: mergeResolvers(resolversArray),
        directiveResolvers
    });
};

const _loadApiSchemas = (): any[] => _loadFiles('../api/**/schema.gql');
const _loadCommonSchemas = (): any[] => _loadFiles('../graphql/**/schema.gql');
const _loadApiResolvers = (): any[] => _loadFiles('../api/**/resolver.js');
const _loadCommonResolvers = (): any[] => _loadFiles('../graphql/**/resolver.js');

const _loadFiles = (glob: string) => loadFilesSync(path.join(__dirname, glob));

export { stitchSchema };