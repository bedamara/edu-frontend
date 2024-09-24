import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';

import * as Types from './types';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];

export const LoadAttemptsDocument = gql`
    query LoadAttempts(
        $filters: AttemptFiltersInput
        $publicationState: PublicationState
        $pagination: PaginationArg
        $sort: [String]
        $attemptTaskValuesPublicationState2: PublicationState
        $attemptTaskValuesPagination2: PaginationArg
    ) {
        attempts(
            filters: $filters
            publicationState: $publicationState
            pagination: $pagination
            sort: $sort
        ) {
            data {
                id
                attributes {
                    CompletedAt
                    slug
                    Status
                    Test {
                        data {
                            id
                            attributes {
                                slug
                                CompleteTestBefore
                            }
                        }
                    }
                    Student {
                        data {
                            id
                        }
                    }
                    publishedAt
                    AttemptTaskValues(
                        publicationState: $attemptTaskValuesPublicationState2
                        pagination: $attemptTaskValuesPagination2
                    ) {
                        data {
                            id
                            attributes {
                                IsCorrect
                                Task {
                                    data {
                                        id
                                    }
                                }
                                Attempt {
                                    data {
                                        id
                                    }
                                }
                                Value
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const LoadAllAttemptsByIdsDocument = gql`
    query LoadAllAttemptsByIds(
        $publicationState: PublicationState
        $pagination: PaginationArg
        $filters: AttemptFiltersInput
        $attemptTaskValuesPublicationState2: PublicationState
        $attemptTaskValuesPagination2: PaginationArg
        $tasksPublicationState2: PublicationState
        $tasksPagination2: PaginationArg
    ) {
        attempts(
            publicationState: $publicationState
            pagination: $pagination
            filters: $filters
        ) {
            data {
                id
                attributes {
                    CompletedAt
                    slug
                    Status
                    Student {
                        data {
                            id
                        }
                    }
                    Test {
                        data {
                            attributes {
                                slug
                                CompleteTestBefore
                                Tasks(
                                    publicationState: $tasksPublicationState2
                                    pagination: $tasksPagination2
                                ) {
                                    data {
                                        id
                                    }
                                }
                            }
                            id
                        }
                    }
                    publishedAt
                    AttemptTaskValues(
                        publicationState: $attemptTaskValuesPublicationState2
                        pagination: $attemptTaskValuesPagination2
                    ) {
                        data {
                            id
                            attributes {
                                IsCorrect
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const CreateAttemptDocument = gql`
    mutation CreateAttempt($data: AttemptInput!) {
        createAttempt(data: $data) {
            data {
                id
                attributes {
                    CompletedAt
                    slug
                    Status
                    Test {
                        data {
                            id
                            attributes {
                                slug
                            }
                        }
                    }
                    Student {
                        data {
                            id
                        }
                    }
                    publishedAt
                }
            }
        }
    }
`;
export const UpdateAttemptDocument = gql`
    mutation UpdateAttempt($updateAttemptId: ID!, $data: AttemptInput!) {
        updateAttempt(id: $updateAttemptId, data: $data) {
            data {
                id
            }
        }
    }
`;
export const CreateAttemptTaskValueDocument = gql`
    mutation CreateAttemptTaskValue($data: AttemptTaskValueInput!) {
        createAttemptTaskValue(data: $data) {
            data {
                id
                attributes {
                    Attempt {
                        data {
                            id
                        }
                    }
                    IsCorrect
                    Task {
                        data {
                            id
                        }
                    }
                    Value
                    publishedAt
                }
            }
        }
    }
`;
export const UpdateAttemptTaskValueDocument = gql`
    mutation UpdateAttemptTaskValue(
        $updateAttemptTaskValueId: ID!
        $data: AttemptTaskValueInput!
    ) {
        updateAttemptTaskValue(id: $updateAttemptTaskValueId, data: $data) {
            data {
                id
                attributes {
                    publishedAt
                    Value
                    Task {
                        data {
                            id
                        }
                    }
                    IsCorrect
                    Attempt {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`;
export const LoadAllAttemptValuesDocument = gql`
    query LoadAllAttemptValues(
        $publicationState: PublicationState
        $pagination: PaginationArg
        $filters: AttemptFiltersInput
        $attemptTaskValuesPublicationState2: PublicationState
        $attemptTaskValuesPagination2: PaginationArg
    ) {
        attempts(
            publicationState: $publicationState
            pagination: $pagination
            filters: $filters
        ) {
            data {
                id
                attributes {
                    Student {
                        data {
                            id
                        }
                    }
                    AttemptTaskValues(
                        publicationState: $attemptTaskValuesPublicationState2
                        pagination: $attemptTaskValuesPagination2
                    ) {
                        data {
                            attributes {
                                IsCorrect
                                Task {
                                    data {
                                        id
                                        attributes {
                                            Theme {
                                                data {
                                                    id
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const LoginDocument = gql`
    mutation Login($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                id
                email
                blocked
                confirmed
                firstName
                lastName
                username
                role {
                    name
                }
            }
        }
    }
`;
export const LoadUserRolesDocument = gql`
    query LoadUserRoles {
        me {
            role {
                name
            }
        }
    }
`;
export const LoadClassesDataDocument = gql`
    query LoadClassesData(
        $filters: ClassFiltersInput
        $publicationState: PublicationState
        $pagination: PaginationArg
    ) {
        classes(filters: $filters, publicationState: $publicationState) {
            data {
                id
                attributes {
                    Name
                    Students(pagination: $pagination) {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                email
                            }
                        }
                    }
                    School {
                        data {
                            id
                            attributes {
                                Name
                            }
                        }
                    }
                    Teacher {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                middleName
                                email
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const LoadTasksDataDocument = gql`
    query LoadTasksData(
        $pagination: PaginationArg
        $publicationState: PublicationState
        $sort: [String]
        $filters: TaskFiltersInput
    ) {
        tasks(
            pagination: $pagination
            publicationState: $publicationState
            sort: $sort
            filters: $filters
        ) {
            data {
                id
                attributes {
                    AnswerDescription
                    Description
                    File {
                        data {
                            id
                            attributes {
                                url
                                caption
                                alternativeText
                            }
                        }
                    }
                    Theme {
                        data {
                            id
                            attributes {
                                OrderedTaskTheme {
                                    data {
                                        id
                                        attributes {
                                            ExamPosition
                                        }
                                    }
                                }
                            }
                        }
                    }
                    slug
                    Answer
                }
            }
        }
    }
`;
export const LoadTasksWithAnswersDocument = gql`
    query LoadTasksWithAnswers(
        $pagination: PaginationArg
        $publicationState: PublicationState
        $sort: [String]
        $filters: TaskFiltersInput
    ) {
        tasks(
            pagination: $pagination
            publicationState: $publicationState
            sort: $sort
            filters: $filters
        ) {
            data {
                id
                attributes {
                    Answer
                }
            }
        }
    }
`;
export const LoadTasksListDocument = gql`
    query LoadTasksList(
        $publicationState: PublicationState
        $pagination: PaginationArg
        $sort: [String]
    ) {
        tasks(
            publicationState: $publicationState
            pagination: $pagination
            sort: $sort
        ) {
            data {
                id
                attributes {
                    Theme {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`;
export const CreateTestDocument = gql`
    mutation CreateTest($data: TestInput!) {
        createTest(data: $data) {
            data {
                id
                attributes {
                    slug
                }
            }
        }
    }
`;
export const LoadTestBySlugDocument = gql`
    query LoadTestBySlug(
        $filters: TestFiltersInput
        $publicationState: PublicationState
        $pagination: PaginationArg
        $tasksPagination2: PaginationArg
        $assignedToPagination2: PaginationArg
    ) {
        tests(
            filters: $filters
            publicationState: $publicationState
            pagination: $pagination
        ) {
            data {
                id
                attributes {
                    CompleteTestBefore
                    AvailableAttempts
                    Tasks(pagination: $tasksPagination2) {
                        data {
                            id
                        }
                    }
                    MadeBy {
                        data {
                            id
                        }
                    }
                    AssignedTo(pagination: $assignedToPagination2) {
                        data {
                            id
                        }
                    }
                    publishedAt
                }
            }
        }
    }
`;
export const LoadAllUserTestsDocument = gql`
    query LoadAllUserTests(
        $publicationState: PublicationState
        $pagination: PaginationArg
        $filters: TestFiltersInput
        $tasksPagination2: PaginationArg
        $assignedToPagination2: PaginationArg
    ) {
        tests(
            publicationState: $publicationState
            pagination: $pagination
            filters: $filters
        ) {
            data {
                id
                attributes {
                    AvailableAttempts
                    CompleteTestBefore
                    MadeBy {
                        data {
                            id
                        }
                    }
                    Tasks(pagination: $tasksPagination2) {
                        data {
                            id
                        }
                    }
                    publishedAt
                    slug
                    AssignedTo(pagination: $assignedToPagination2) {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`;
export const LoadTestInfoBySlugDocument = gql`
    query LoadTestInfoBySlug($filters: TestFiltersInput) {
        tests(filters: $filters) {
            data {
                id
            }
        }
    }
`;
export const LoadThemesDataDocument = gql`
    query LoadThemesData(
        $sort: [String]
        $publicationState: PublicationState
        $pagination: PaginationArg
        $taskThemesPagination2: PaginationArg
        $taskThemesPublicationState2: PublicationState
        $filters: OrderedTaskThemeFiltersInput
        $taskThemesFilters2: TaskThemeFiltersInput
    ) {
        orderedTaskThemes(
            sort: $sort
            publicationState: $publicationState
            pagination: $pagination
            filters: $filters
        ) {
            data {
                id
                attributes {
                    ExamPosition
                    Title
                    slug
                    BlockColor
                }
            }
        }
        taskThemes(
            pagination: $taskThemesPagination2
            publicationState: $taskThemesPublicationState2
            filters: $taskThemesFilters2
        ) {
            data {
                id
                attributes {
                    OrderedTaskTheme {
                        data {
                            id
                        }
                    }
                    Title
                    slug
                }
            }
        }
    }
`;

export type SdkFunctionWrapper = <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
    operationName: string,
    operationType?: string,
    variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
    action,
    _operationName,
    _operationType,
    _variables,
) => action();

export function getSdk(
    client: GraphQLClient,
    withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
    return {
        LoadAttempts(
            variables?: Types.LoadAttemptsQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadAttemptsQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadAttemptsQuery>(
                        LoadAttemptsDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadAttempts',
                'query',
                variables,
            );
        },
        LoadAllAttemptsByIds(
            variables?: Types.LoadAllAttemptsByIdsQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadAllAttemptsByIdsQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadAllAttemptsByIdsQuery>(
                        LoadAllAttemptsByIdsDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadAllAttemptsByIds',
                'query',
                variables,
            );
        },
        CreateAttempt(
            variables: Types.CreateAttemptMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.CreateAttemptMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.CreateAttemptMutation>(
                        CreateAttemptDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'CreateAttempt',
                'mutation',
                variables,
            );
        },
        UpdateAttempt(
            variables: Types.UpdateAttemptMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.UpdateAttemptMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.UpdateAttemptMutation>(
                        UpdateAttemptDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'UpdateAttempt',
                'mutation',
                variables,
            );
        },
        CreateAttemptTaskValue(
            variables: Types.CreateAttemptTaskValueMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.CreateAttemptTaskValueMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.CreateAttemptTaskValueMutation>(
                        CreateAttemptTaskValueDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'CreateAttemptTaskValue',
                'mutation',
                variables,
            );
        },
        UpdateAttemptTaskValue(
            variables: Types.UpdateAttemptTaskValueMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.UpdateAttemptTaskValueMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.UpdateAttemptTaskValueMutation>(
                        UpdateAttemptTaskValueDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'UpdateAttemptTaskValue',
                'mutation',
                variables,
            );
        },
        LoadAllAttemptValues(
            variables?: Types.LoadAllAttemptValuesQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadAllAttemptValuesQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadAllAttemptValuesQuery>(
                        LoadAllAttemptValuesDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadAllAttemptValues',
                'query',
                variables,
            );
        },
        Login(
            variables: Types.LoginMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoginMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoginMutation>(
                        LoginDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'Login',
                'mutation',
                variables,
            );
        },
        LoadUserRoles(
            variables?: Types.LoadUserRolesQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadUserRolesQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadUserRolesQuery>(
                        LoadUserRolesDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadUserRoles',
                'query',
                variables,
            );
        },
        LoadClassesData(
            variables?: Types.LoadClassesDataQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadClassesDataQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadClassesDataQuery>(
                        LoadClassesDataDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadClassesData',
                'query',
                variables,
            );
        },
        LoadTasksData(
            variables?: Types.LoadTasksDataQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadTasksDataQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadTasksDataQuery>(
                        LoadTasksDataDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadTasksData',
                'query',
                variables,
            );
        },
        LoadTasksWithAnswers(
            variables?: Types.LoadTasksWithAnswersQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadTasksWithAnswersQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadTasksWithAnswersQuery>(
                        LoadTasksWithAnswersDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadTasksWithAnswers',
                'query',
                variables,
            );
        },
        LoadTasksList(
            variables?: Types.LoadTasksListQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadTasksListQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadTasksListQuery>(
                        LoadTasksListDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadTasksList',
                'query',
                variables,
            );
        },
        CreateTest(
            variables: Types.CreateTestMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.CreateTestMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.CreateTestMutation>(
                        CreateTestDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'CreateTest',
                'mutation',
                variables,
            );
        },
        LoadTestBySlug(
            variables?: Types.LoadTestBySlugQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadTestBySlugQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadTestBySlugQuery>(
                        LoadTestBySlugDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadTestBySlug',
                'query',
                variables,
            );
        },
        LoadAllUserTests(
            variables?: Types.LoadAllUserTestsQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadAllUserTestsQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadAllUserTestsQuery>(
                        LoadAllUserTestsDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadAllUserTests',
                'query',
                variables,
            );
        },
        LoadTestInfoBySlug(
            variables?: Types.LoadTestInfoBySlugQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadTestInfoBySlugQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadTestInfoBySlugQuery>(
                        LoadTestInfoBySlugDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadTestInfoBySlug',
                'query',
                variables,
            );
        },
        LoadThemesData(
            variables?: Types.LoadThemesDataQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<Types.LoadThemesDataQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<Types.LoadThemesDataQuery>(
                        LoadThemesDataDocument,
                        variables,
                        { ...requestHeaders, ...wrappedRequestHeaders },
                    ),
                'LoadThemesData',
                'query',
                variables,
            );
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
