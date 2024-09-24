'use server';

import { signOut } from '@/shared/lib/next-auth';

export const signOutServerAction = async () => {
    try {
        return await signOut({
            redirect: false,
        });
    } catch (e) {
        return null;
    }
};
