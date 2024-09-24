import type { LoginMutation } from '@/shared/api/cms-service/graphql/types';

export type SessionUser = LoginMutation['login']['user'];
