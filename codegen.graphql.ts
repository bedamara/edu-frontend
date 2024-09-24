import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as envConfig } from 'dotenv';

envConfig();

const baseTypesPath = './src/shared/api/cms-service/graphql/types.ts';
const sdkPath = './src/shared/api/cms-service/graphql/sdk.ts';

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.CMS_SERVICE_GRAPHQL,
    documents: [
        './src/shared/api/cms-service/graphql/operations/auth.gql',
        './src/shared/api/cms-service/graphql/operations/classes.gql',
        './src/shared/api/cms-service/graphql/operations/themes.gql',
        './src/shared/api/cms-service/graphql/operations/tasks.gql',
        './src/shared/api/cms-service/graphql/operations/tests.gql',
        './src/shared/api/cms-service/graphql/operations/attempts.gql',
    ],
    generates: {
        [baseTypesPath]: {
            config: {
                skipTypename: true,
                enumsAsTypes: true,
            },
            plugins: ['typescript', 'typescript-operations'],
        },
        [sdkPath]: {
            preset: 'import-types',
            config: {
                skipTypename: true,
                enumsAsTypes: true,
            },
            presetConfig: {
                typesPath: './types',
            },
            plugins: ['typescript-graphql-request'],
        },
    },
};

export default config;
