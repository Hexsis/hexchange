import { ApolloServer } from 'apollo-server';
import { stitchSchema } from './utils/schemaStitching';

const schema = stitchSchema();

const server = new ApolloServer({
    schema,
    context: async (request) => {
        // let user = await checkJWTGraphql(request);
        // return { user, pubsub };
        const user = { isAuthenticated: true, role: 'customer' }
        return { user };
    },
});
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
