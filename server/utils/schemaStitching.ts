import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { ITypeDefinitions, IResolvers } from '@graphql-tools/utils'

const stitchSchema = (): { typeDefs: ITypeDefinitions; resolvers: IResolvers; } => {
    const typesArray = [
        ...loadFilesSync(path.join(__dirname, '../api/**/schema.gql')),
        ...loadFilesSync(path.join(__dirname, '../graphql/**/schema.gql'))
    ];
    const resolversArray = [
        ...loadFilesSync(path.join(__dirname, '../api/**/resolver.js')),
        ...loadFilesSync(path.join(__dirname, '../graphql/**/resolver.js'))
    ];
    return {
        typeDefs: mergeTypeDefs(typesArray),
        resolvers: mergeResolvers(resolversArray)
    };
};

export { stitchSchema };