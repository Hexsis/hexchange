import { Resolvers } from '../../graphql/types';
import { user } from './service/exampleService';

const resolvers: Resolvers = {
    Query: {
        user
    }
};

export default resolvers;