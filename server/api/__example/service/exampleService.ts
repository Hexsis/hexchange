import { User, Resolver } from '../../../graphql/types';

const user: Resolver<User> = async (
    _parent,
    _args,
    _context,
    _info
): Promise<User> => fetchUserById('1');

const fetchUserById = async (id: String): Promise<User> => ({
    id: '1',
    username: 'kaziwaseef',
    name: {
        first: 'Kazi',
        middle: 'Jerico',
        last: 'Waseef'
    }
})

export { user, fetchUserById };