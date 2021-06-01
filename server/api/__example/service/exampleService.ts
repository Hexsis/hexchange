import { PingResponse, Resolver } from '../../../graphql/types';

const ping: Resolver<PingResponse> = async (
    _parent,
    _args,
    _context,
    _info
): Promise<PingResponse> => ({
    result: 'pong',
    health: 'healthy',
    user: {
        id: '1',
        greeting: 'Hello World'
    }
});

export { ping };