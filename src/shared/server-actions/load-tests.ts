'use server';

import { loadTestBySlug, loadTestsByUserId } from '@/shared/api/cms-service';
import { auth } from '@/shared/lib/next-auth';

export const getTestData = async (slug: string, withoutAnswers = true) => {
    const session = await auth();
    const token = session && session.token;

    if (!token) {
        return null;
    }

    try {
        return await loadTestBySlug(token, slug, withoutAnswers);
    } catch (e) {
        console.log('Error loading test info', e);
        return null;
    }
};

export const getAllTestsData = async (userId?: string) => {
    const session = await auth();
    const token = session && session.token;

    if (!token || !session?.user.id) {
        return null;
    }

    try {
        return await loadTestsByUserId(token, userId || session?.user.id);
    } catch (e) {
        console.log('Error loading test info', e);
        return null;
    }
};
