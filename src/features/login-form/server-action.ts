'use server';

import { loginFormSchema } from '@/features/login-form/schema';
import { signIn } from '@/shared/lib/next-auth';

export const signInServerAction = async (credentials: unknown) => {
    try {
        const { email, password } =
            await loginFormSchema.parseAsync(credentials);
        return await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
    } catch (error) {
        console.error(error);
        return null;
    }
};
