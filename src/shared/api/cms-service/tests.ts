import * as z from 'zod';

import { createTestServerSchema } from '@/features/create-test-form/schema';
import { CmsGqlSdk } from '@/shared/api/cms-service/graphql';
import { loadTasksData, loadTasksList } from '@/shared/api/cms-service/tasks';
import { ShowingTest, ShowingTestData, Task } from '@/shared/types';

type Data = {
    userId: string;
    role: string;
    data: z.infer<typeof createTestServerSchema>;
};

function getRandomElements<T>(array: T[], n: number): T[] {
    const shuffled = array.slice(); // Создаем копию массива
    let i = array.length;
    const min = i - n;
    while (i-- > min) {
        const index = Math.floor((i + 1) * Math.random()); // Генерируем случайный индекс
        [shuffled[i], shuffled[index]] = [shuffled[index], shuffled[i]]; // Меняем местами элементы
    }
    return shuffled.slice(min); // Возвращаем n случайных элементов
}

export const createTest = async (token: string, createTestData: Data) => {
    const allTasks = await loadTasksList(token);

    if (!allTasks) {
        return null;
    }

    const {
        data: { tasks: tasksForTest, students, completeBefore },
        userId,
        role,
    } = createTestData;

    const { tasksList } = allTasks;

    const randomTasks = tasksForTest.reduce((prev, current) => {
        const { tasksCount, themes } = current;
        const tasksByTheme = tasksList.filter((item) =>
            themes.includes(item.themeId || ''),
        );
        return [
            ...prev,
            ...getRandomElements(tasksByTheme, tasksCount).map(
                (item) => item.id || '',
            ),
        ];
    }, [] as string[]);

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const isTeacher = role.toLowerCase() === 'teacher';

    try {
        const tasksData = await CmsGqlSdk.CreateTest(
            {
                data: {
                    AssignedTo: isTeacher ? students : [userId],
                    MadeBy: userId,
                    Tasks: randomTasks,
                    AvailableAttempts: 1,
                    publishedAt: new Date().toISOString(),
                    ...(isTeacher && completeBefore
                        ? { CompleteTestBefore: completeBefore }
                        : {}),
                },
            },
            headers,
        );

        return {
            id: tasksData.createTest?.data?.id,
            slug: tasksData.createTest?.data?.attributes?.slug,
        };
    } catch (e) {
        return null;
    }
};

export const loadTestBySlug = async (
    token: string,
    slug: string,
    withoutAnswers = true,
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const testData = await CmsGqlSdk.LoadTestBySlug(
            {
                publicationState: 'LIVE',
                pagination: {
                    limit: 1000,
                },
                tasksPagination2: {
                    limit: 1000,
                },
                assignedToPagination2: {
                    limit: 1000,
                },
                filters: {
                    slug: {
                        eq: slug,
                    },
                },
            },
            headers,
        );

        if (!testData || testData.tests?.data.length === 0) {
            return null;
        }

        const test = testData.tests?.data[0];

        const taskIds = (test?.attributes?.Tasks?.data || []).map(
            (item) => item.id || '',
        );

        const tasksData = await loadTasksData(
            token,
            { taskIds },
            withoutAnswers,
        );

        const result: ShowingTestData = {
            tasks: tasksData?.tasks || ([] as Task[]),
            test: {
                id: test?.id || '',
                publishedAt: test?.attributes?.publishedAt,
                AvailableAttempts: test?.attributes?.AvailableAttempts,
                MadeBy: test?.attributes?.MadeBy?.data?.id || '',
                AssignedTo: (test?.attributes?.AssignedTo?.data || []).map(
                    (item) => item.id || '',
                ),
                Tasks: (test?.attributes?.Tasks?.data || []).map(
                    (item) => item.id || '',
                ),
                CompleteTestBefore: test?.attributes?.CompleteTestBefore,
            },
        };

        return result;
    } catch (e) {
        return null;
    }
};

export const loadTestsByUserId = async (token: string, userId: string) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const testsData = await CmsGqlSdk.LoadAllUserTests(
            {
                publicationState: 'LIVE',
                pagination: {
                    limit: 1000,
                },
                tasksPagination2: {
                    limit: 1000,
                },
                assignedToPagination2: {
                    limit: 1000,
                },
                filters: {
                    or: [
                        {
                            MadeBy: {
                                id: {
                                    eq: userId,
                                },
                            },
                        },
                        {
                            AssignedTo: {
                                id: {
                                    eq: userId,
                                },
                            },
                        },
                    ],
                },
            },
            headers,
        );

        if (!testsData || testsData.tests?.data.length === 0) {
            return null;
        }

        const result: ShowingTest[] = (testsData.tests?.data || []).map(
            (test) => {
                return {
                    id: test?.id || '',
                    publishedAt: test?.attributes?.publishedAt,
                    AvailableAttempts: test?.attributes?.AvailableAttempts,
                    MadeBy: test?.attributes?.MadeBy?.data?.id || '',
                    AssignedTo: (test?.attributes?.AssignedTo?.data || []).map(
                        (item) => item.id || '',
                    ),
                    Tasks: (test?.attributes?.Tasks?.data || []).map(
                        (item) => item.id || '',
                    ),
                    CompleteTestBefore: test?.attributes?.CompleteTestBefore,
                    slug: test.attributes?.slug || '',
                };
            },
        );

        return result;
    } catch (e) {
        return null;
    }
};

export const loadTestInfoBySlug = async (token: string, slug: string) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const testData = await CmsGqlSdk.LoadTestInfoBySlug(
            {
                filters: {
                    slug: {
                        eq: slug,
                    },
                },
            },
            headers,
        );

        if (!testData || testData.tests?.data.length === 0) {
            return null;
        }

        return testData.tests?.data[0];
    } catch (e) {
        return null;
    }
};
