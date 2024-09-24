import { ClientError } from 'graphql-request';

export const getGqlErrorMessage = (error: Error) => {
    if (error instanceof ClientError) {
        const graphqlErrors = error.response.errors;
        return (graphqlErrors || []).map((err) => err.message).join(' ');
    }
    return `${error.message} StackTrace: ${error.stack}`;
};
