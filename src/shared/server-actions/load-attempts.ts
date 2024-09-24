'use server';

import {
    createAttempt,
    loadAllAttempts,
    loadAllAttemptValuesCount,
    loadAttempts,
    loadTestInfoBySlug,
} from '@/shared/api/cms-service';
import { auth } from '@/shared/lib/next-auth';

export const getAttemptsData = async (slug?: string) => {
    const session = await auth();
    const token = session && session.token;

    if (!token || !session?.user.id) {
        return null;
    }

    try {
        return await loadAttempts(token, {
            userId: session?.user.id,
            slug,
        });
    } catch (e) {
        console.log('Error loading test info', e);
        return null;
    }
};

export const getAllAttemptsData = async (userIds?: string[]) => {
    const session = await auth();
    const token = session && session.token;

    if (!token || !session?.user.id) {
        return null;
    }

    try {
        return await loadAllAttempts(
            token,
            userIds ? userIds : [session?.user.id],
        );
    } catch (e) {
        console.log('Error loading test info', e);
        return null;
    }
};

export const getAttemptValuesStatistics = async (userIds?: string[]) => {
    const session = await auth();
    const token = session && session.token;

    if (!token || !session?.user.id) {
        return null;
    }

    try {
        return await loadAllAttemptValuesCount(
            token,
            userIds ? userIds : [session?.user.id],
        );
    } catch (e) {
        console.log('Error loading test info', e);
        return null;
    }
};

type Params = {
    testId?: string;
    testSlug?: string;
};
export const createNewAttempt = async (params: Params) => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }

        const {
            token,
            user: { id: studentId },
        } = session;

        const role = session.user.role?.name;

        if (!token || !role) {
            return null;
        }

        const { testId, testSlug } = params;

        if (testSlug) {
            const testDataBySlug = await loadTestInfoBySlug(token, testSlug);
            if (!testDataBySlug) {
                return null;
            }
            return await createAttempt(token, {
                studentId,
                testId: testDataBySlug.id || '',
            });
        }

        if (testId) {
            return await createAttempt(token, { studentId, testId });
        }

        return null;
    } catch (error) {
        console.log('Error validation');
        return null;
    }
};
