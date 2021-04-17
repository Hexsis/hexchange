import { Resolvers } from '../../graphql/types';
import { ping } from './service/exampleService';

const resolvers: Resolvers = {
    Query: {
        ping
    }
};

export default resolvers;