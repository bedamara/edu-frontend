import { CMS_SERVICE_GRAPHQL } from '@/shared/config';
import { getGraphQLClient } from '@/shared/lib/graphql-client';

import { getSdk } from './sdk';

export const CmsGqlSdk = getSdk(getGraphQLClient(CMS_SERVICE_GRAPHQL));
