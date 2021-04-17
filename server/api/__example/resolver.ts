import { QueryResolvers } from '../../graphql/types';
import { ping } from './service/exampleService';

const Query: QueryResolvers = {
    ping
}

export default { Query };