import { NotAuthenticatedError, NotAuthorizedError } from '../../utils/errors';
import { NextResolverFn } from '@graphql-tools/utils';

export default async (next: NextResolverFn, _src: any, args: any, context: any) => {
    const field = await next();
    const roles = args.oneOf; // TODO: Define proper roles from a central source and check if roles are correct

    if (!context.user.isAuthenticated) {
        throw new NotAuthenticatedError();
    }
    else if (!roles.includes(context.user?.role)) {
        throw new NotAuthorizedError();
    }

    return field;
}