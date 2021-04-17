import { PingResponse, ResolverFn } from '../../../graphql/types';

const ping: ResolverFn = async (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
): Promise<PingResponse> => ({
    result: 'pong',
    health: 'healthy'
});

export { ping };