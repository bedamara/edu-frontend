'use server';

import { loadThemesData } from '@/shared/api/cms-service';
import { auth } from '@/shared/lib/next-auth';

export const getThemesData = async (slug?: string) => {
    const session = await auth();
    const token = session && session.token;

    if (!token) {
        return null;
    }

    try {
        return await loadThemesData(token, slug);
    } catch (e) {
        console.log('Error loading themes', e);
        return null;
    }
};
