import NextAuth, { CredentialsSignin, type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { loadUserRole, loginByCredentials } from '@/shared/api/cms-service';
import { SessionUser } from '@/shared/types/user';

declare module 'next-auth' {
    interface Session {
        user: SessionUser & DefaultSession['user'];
        token?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        cmsJwt: string;
    }
}

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}

class InvalidRoleError extends CredentialsSignin {
    code = 'Only Teacher and Student can auth';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            // @ts-expect-error Authorize typing
            authorize: async (credentials) => {
                const data = await loginByCredentials(
                    String(credentials.email),
                    String(credentials.password),
                );

                if (!data) {
                    throw new InvalidLoginError();
                }

                const { jwt, user } = data;

                if (!jwt) {
                    throw new InvalidLoginError();
                }

                const roleData = await loadUserRole(jwt);

                if (
                    !roleData ||
                    !roleData.role ||
                    !['student', 'teacher'].includes(
                        (roleData.role.name || '').toLowerCase(),
                    )
                ) {
                    throw new InvalidRoleError();
                }

                return {
                    jwt,
                    user: {
                        ...user,
                        ...(roleData ? roleData : {}),
                    },
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user: userAfterAuth }) {
            if (userAfterAuth) {
                const { user, jwt } = userAfterAuth as Partial<{
                    jwt: string;
                    user: SessionUser;
                }>;
                if (user) token.user = user;
                if (jwt) token.cmsJwt = jwt;
            }
            return token;
        },

        async session({ session, token }) {
            if (token.user) {
                // @ts-expect-error Session User typing
                session.user = token.user;
                session.token = token.cmsJwt;
            }
            return session;
        },
    },
    events: {},
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
    session: {
        strategy: 'jwt',
    },
});
