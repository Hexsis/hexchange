import {
    SyntaxError,
    // ValidationError,
    AuthenticationError,
    ForbiddenError,
    // UserInputError,
    // ApolloError
} from 'apollo-server';

export class NotAuthenticatedError extends AuthenticationError {
    constructor(message?: string) {
        super(message || 'Login Required');
    }
}
export class NotAuthorizedError extends ForbiddenError {
    constructor(message?: string) {
        super(message || 'Permission Denied');
    }
}
export class WrongSyntaxError extends SyntaxError {
    constructor(message?: string) {
        super(message || 'Syntax Error');
    }
}