import { NotAuthenticatedError, NotAuthorizedError } from '../../utils/errors';
import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from 'graphql';

// export default async (next: NextResolverFn, _src: any, args: any, context: any) => {
//     const field = await next();
//     const roles = args.oneOf; // TODO: Define proper roles from a central source and check if roles are correct

//     if (!context.user.isAuthenticated) {
//         throw new NotAuthenticatedError();
//     }
//     else if (!roles.includes(context.user?.role)) {
//         throw new NotAuthorizedError();
//     }

//     return field;
// }
export default class HasRoleDirective extends SchemaDirectiveVisitor {
    public visitObject(type: any): void {
        this.ensureFieldsWrapped(type);
        type._oneOf = this.args.oneOf;
    }
    // Visitor methods for nested types like fields and arguments
    // also receive a details object that provides information about
    // the parent and grandparent types.
    public visitFieldDefinition(field: any, details: {
        objectType: GraphQLObjectType;
    }): void {
        this.ensureFieldsWrapped(details.objectType);
        field._oneOf = this.args.oneOf;
    }

    ensureFieldsWrapped(objectType: any): void {
        // Mark the GraphQLObjectType object to avoid re-wrapping:
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (...args: any) {
                // Get the required Role from the field first, falling back
                // to the objectType if no Role is required by the field:
                const roles =
                    field._oneOf ||
                    objectType._oneOf;

                if (!roles) {
                    return resolve.apply(this, args);
                }

                const context = args[2];
                
                if (!context.user.isAuthenticated) {
                    throw new NotAuthenticatedError();
                }
                else if (!roles.includes(context.user?.role)) {
                    throw new NotAuthorizedError();
                }

                return resolve.apply(this, args);
            };
        });
    }
}