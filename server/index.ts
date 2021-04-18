import { ApolloServer } from 'apollo-server';
import context from './utils/getContext';
import { stitchFederatedSchema } from './utils/schemaStitching';
import { cacheControlConfig } from './config/apolloServer';

const server = new ApolloServer({
    schema: stitchFederatedSchema(),
    context,
    cacheControl: cacheControlConfig,
    uploads: false,
    cors: false,
    debug: false,
});

(async () => {
    const { url } = await server.listen({ port: 4001 });
    console.log(`\nServer running at ${url}\n`);
})();