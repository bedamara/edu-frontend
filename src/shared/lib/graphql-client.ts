import { GraphQLClient } from 'graphql-request';

import { isDevelopment } from '@/shared/config';

const gqlClientInstances: Record<string, GraphQLClient> = {};

export const getGraphQLClient = (uri: string) => {
    // Если instance нужного GqlClient уже есть
    if (
        isDevelopment &&
        (global as any)._globalGqlClientInstances &&
        (global as any)._globalGqlClientInstances[uri]
    ) {
        return (global as any)._globalGqlClientInstances[uri];
    }

    if (gqlClientInstances && gqlClientInstances[uri]) {
        return gqlClientInstances[uri];
    }

    // Если instance нужного GqlClient ещё нет
    gqlClientInstances[uri] = new GraphQLClient(uri, {
        errorPolicy: 'all',
    });

    if (isDevelopment) {
        (global as any)._globalGqlClientInstances = {
            ...(global as any)._globalGqlClientInstances,
            [uri]: gqlClientInstances[uri],
        };
    }

    return gqlClientInstances[uri];
};
