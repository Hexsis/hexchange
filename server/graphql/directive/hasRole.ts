import { NotAuthenticatedError, NotAuthorizedError } from '../../utils/errors';
import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLObjectType } from 'graphql';

export default class HasRoleDirective extends SchemaDirectiveVisitor {
    public visitObject(type: any): void {
        this.ensureFieldsWrapped(type);
        type._anyOf = this.args.anyOf;
        type._allOf = this.args.allOf;
    }
    // Visitor methods for nested types like fields and arguments
    // also receive a details object that provides information about
    // the parent and grandparent types.
    public visitFieldDefinition(field: any, details: {
        objectType: GraphQLObjectType;
    }): void {
        this.ensureFieldsWrapped(details.objectType);
        field._anyOf = this.args.anyOf;
        field._allOf = this.args.allOf;
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
                
                const anyOf = field._anyOf || objectType._anyOf;
                const allOf = field._allOf || objectType._allOf;

                if (!anyOf && !allOf) {
                    return resolve.apply(this, args);
                }

                const context = args[2];
                
                if (!context.user.isAuthenticated) {
                    throw new NotAuthenticatedError();
                }
                else if (!_isInRole(context.user?.roles, anyOf, allOf)) {
                    throw new NotAuthorizedError();
                }

                return resolve.apply(this, args);
            };
        });
    }
}

const _isInRole = (
    roles: Array<string>,
    anyOf: Array<string>,
    allOf: Array<string>
) => {
    // If anyOf AND If any element from anyOf is in roles then true
    // IF allOf AND If all elements from allOf is in roles then true
    if (Array.isArray(anyOf)) {
        return !!roles.filter(v => anyOf.includes(v))
    }
    else if (Array.isArray(allOf)) {
        return roles.filter(v => allOf.includes(v)).length === allOf.length
    }

    return false;
}