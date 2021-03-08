import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema } from 'graphql';
import { directiveResolvers } from '../graphql/directive';

const stitchSchema = (): GraphQLSchema => {
    const typesArray = [
        ...loadFilesSync(path.join(__dirname, '../api/**/schema.gql')),
        ...loadFilesSync(path.join(__dirname, '../graphql/**/schema.gql'))
    ];
    const resolversArray = [
        ...loadFilesSync(path.join(__dirname, '../api/**/resolver.js')),
        ...loadFilesSync(path.join(__dirname, '../graphql/**/resolver.js'))
    ];
    return makeExecutableSchema({
        typeDefs: mergeTypeDefs(typesArray),
        resolvers: mergeResolvers(resolversArray),
        directiveResolvers
    });
};

export { stitchSchema };