'use server';

import { completeTestFormServerSchema } from '@/features/showing-test/schema';
import {
    AttemptTaskValueData,
    completeAttempt,
    createOrUpdateAttemptTaskValue,
} from '@/shared/api/cms-service';
import { auth } from '@/shared/lib/next-auth';

export const createOrUpdateAttemptValueServerAction = async (
    data: AttemptTaskValueData,
) => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }

        const { token } = session;

        if (!token) {
            return null;
        }

        return await createOrUpdateAttemptTaskValue(token, data);
    } catch (error) {
        console.log('Error validation');
        return null;
    }
};

export const completeAttemptServerAction = async (data: unknown) => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }

        const { token } = session;

        if (!token) {
            return null;
        }

        const validData = await completeTestFormServerSchema.parseAsync(data);

        return await completeAttempt(token, validData);
    } catch (error) {
        console.log('Error validation');
        return null;
    }
};
