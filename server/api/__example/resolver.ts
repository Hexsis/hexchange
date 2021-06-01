import { Resolvers } from '../../graphql/types';
import { user, fetchUserById } from './service/exampleService';

const resolvers: Resolvers = {
    Query: {
        user
    },
    User: {
        __resolveReference(user) {
            return fetchUserById(user.id)
        }
    }
};



export default resolvers;