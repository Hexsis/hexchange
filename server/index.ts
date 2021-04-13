import { ApolloServer } from 'apollo-server';
import getContext from './utils/getContext';
import { stitchFederatedSchema } from './utils/schemaStitching';

const server = new ApolloServer({
    schema: stitchFederatedSchema(),
    context: getContext
});

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
