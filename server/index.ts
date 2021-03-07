import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchema } from './utils/schemaStitching';

const { typeDefs, resolvers } = stitchSchema();
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const server = new ApolloServer({ schema });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
