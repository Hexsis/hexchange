import path from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import { SchemaDirectiveVisitor } from 'apollo-server';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema } from 'graphql';
import { directiveResolvers } from '../graphql/directive';

const stitchFederatedSchema = (): GraphQLSchema => {
    const typesArray = [
        ..._loadApiSchemas(),
        ..._loadCommonSchemas()
    ];
    const resolversArray = [
        ..._loadApiResolvers(),
        ..._loadCommonResolvers()
    ];
    const schema = buildFederatedSchema({
        typeDefs: mergeTypeDefs(typesArray),
        resolvers: mergeResolvers(resolversArray)
    });

    SchemaDirectiveVisitor.visitSchemaDirectives(schema, directiveResolvers);

    return schema;
};

const _loadApiSchemas = (): any[] => _loadFiles('../api/**/schema.gql');
const _loadCommonSchemas = (): any[] => _loadFiles('../graphql/**/schema.gql');
const _loadApiResolvers = (): any[] => _loadFiles('../api/**/resolver.js');
const _loadCommonResolvers = (): any[] => _loadFiles('../graphql/**/resolver.js');

const _loadFiles = (glob: string) => loadFilesSync(path.join(__dirname, glob));

export { stitchFederatedSchema };