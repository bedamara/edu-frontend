'use server';

import {
    loadTasksData,
    LoadTasksFilters,
    loadTasksList,
} from '@/shared/api/cms-service';
import { auth } from '@/shared/lib/next-auth';

export const getTasksData = async ({ themeIds = [] }: LoadTasksFilters) => {
    const session = await auth();
    const token = session && session.token;

    if (!token) {
        return null;
    }

    try {
        return await loadTasksData(token, { themeIds });
    } catch (e) {
        console.log('Error loading tasks', e);
        return null;
    }
};

export const getTasksListData = async () => {
    const session = await auth();
    const token = session && session.token;

    if (!token) {
        return null;
    }

    try {
        return await loadTasksList(token);
    } catch (e) {
        console.log('Error loading tasks list', e);
        return null;
    }
};
