'use server';

import { createTestServerSchema } from '@/features/create-test-form/schema';
import { createTest } from '@/shared/api/cms-service';
import { auth } from '@/shared/lib/next-auth';

export const createTestServerAction = async (data: unknown) => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }

        const {
            token,
            user: { id: userId },
        } = session;

        const role = session.user.role?.name;

        if (!token || !role) {
            return null;
        }

        const validData = await createTestServerSchema.parseAsync(data);

        return await createTest(token, { data: validData, userId, role });
    } catch (error) {
        console.log('Error validation');
        return null;
    }
};
