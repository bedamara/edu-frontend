import { CmsGqlSdk } from '@/shared/api/cms-service/graphql';

export const loginByCredentials = async (
    identifier: string,
    password: string,
) => {
    try {
        const data = await CmsGqlSdk.Login({
            input: {
                identifier,
                password,
            },
        });
        return data.login;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const loadUserRole = async (jwt: string) => {
    try {
        const data = await CmsGqlSdk.LoadUserRoles(
            {},
            {
                Authorization: `Bearer ${jwt}`,
            },
        );
        return data.me;
    } catch (error) {
        return null;
    }
};
