import { ApolloServer } from 'apollo-server';
import { stitchFederatedSchema } from './utils/schemaStitching';

const server = new ApolloServer({
    schema: stitchFederatedSchema(),
    context: async (request) => {
        // let user = await checkJWTGraphql(request);
        // return { user, pubsub };
        const user = { isAuthenticated: true, role: 'customer' }
        return { user };
    },
});
// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
