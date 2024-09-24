import { isFuture, isValid as isValidDate, parseISO } from 'date-fns';
import * as z from 'zod';

import { completeTestFormServerSchema } from '@/features/showing-test/schema';
import { CmsGqlSdk } from '@/shared/api/cms-service/graphql';
import {
    CreateAttemptTaskValueMutation,
    Enum_Attempt_Status,
    LoadAllAttemptsByIdsQuery,
    LoadAttemptsQuery,
    UpdateAttemptTaskValueMutation,
} from '@/shared/api/cms-service/graphql/types';
import {
    StudentAttempt,
    StudentAttemptInfo,
    StudentAttemptTaskValue,
} from '@/shared/types/attempt';

type CompleteAttemptData = z.infer<typeof completeTestFormServerSchema>;

export const completeAttempt = async (
    token: string,
    data: CompleteAttemptData,
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const { answers, attemptId } = data;

    try {
        const tasksData = await CmsGqlSdk.LoadTasksWithAnswers(
            {
                filters: {
                    id: {
                        in: answers.map((item) => item.taskId || ''),
                    },
                },
                pagination: {
                    limit: 5000,
                },
                publicationState: 'LIVE',
            },
            headers,
        );
        const tasksWithAnswers = (tasksData.tasks?.data || []).map((item) => ({
            taskId: item.id || '',
            answer: item.attributes?.Answer,
        }));

        const result = await Promise.all(
            tasksWithAnswers.map(async (item) => {
                const { taskId, answer = '' } = item || {};
                const attemptAnswer = answers.find((a) => a.taskId === taskId);
                const isCorrect = Boolean(
                    attemptAnswer?.value &&
                        answer &&
                        answer.trim().toLowerCase() ===
                            attemptAnswer.value.trim().toLowerCase(),
                );

                return {
                    taskId,
                    value: attemptAnswer?.value,
                    attemptValueId: attemptAnswer?.attemptValueId,
                    isCorrect,
                };
            }),
        );

        await Promise.all([
            updateAttempt(token, {
                attemptId,
                Status: 'completed',
            }),
            ...result
                .filter((item) => item.attemptValueId)
                .map((item) =>
                    createOrUpdateAttemptTaskValue(token, {
                        id: item.attemptValueId,
                        attemptId,
                        taskId: item.taskId,
                        value: item.value || '',
                        isCorrect: item.isCorrect,
                    }),
                ),
        ]);

        return result.map((item) => ({
            taskId: item.taskId,
            isCorrect: item.isCorrect,
        }));
    } catch (e) {
        console.log(e);
        return null;
    }
};

type AttemptData = {
    testId: string;
    studentId: string;
};
export const createAttempt = async (
    token: string,
    createAttemptData: AttemptData,
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const { testId, studentId } = createAttemptData;

    try {
        const attemptData = await CmsGqlSdk.CreateAttempt(
            {
                data: {
                    Student: studentId,
                    Test: testId,
                    Status: 'in_progress',
                    publishedAt: new Date().toISOString(),
                },
            },
            headers,
        );

        const data = attemptData.createAttempt?.data;

        if (!data) {
            return null;
        }

        const result: StudentAttempt = {
            id: data.id || '',
            Test: {
                id: data.attributes?.Test?.data?.id || '',
                slug: data.attributes?.Test?.data?.attributes?.slug || '',
            },
            Student: data.attributes?.Student?.data?.id || '',
            Status: data.attributes?.Status,
            slug: data.attributes?.slug,
            CompletedAt: data.attributes?.CompletedAt,
            Values: [],
        };

        return result;
    } catch (e) {
        return null;
    }
};

type UpdateAttemptData = {
    attemptId: string;
    Status: Enum_Attempt_Status;
};

export const updateAttempt = async (
    token: string,
    updateAttemptData: UpdateAttemptData,
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const { attemptId, Status } = updateAttemptData;

    try {
        const updateData = await CmsGqlSdk.UpdateAttempt(
            {
                updateAttemptId: attemptId,
                data: {
                    Status,
                    ...(Status === 'completed'
                        ? { CompletedAt: new Date().toISOString() }
                        : {}),
                },
            },
            headers,
        );

        return updateData.updateAttempt?.data?.id || '';
    } catch (e) {
        return null;
    }
};

export type AttemptTaskValueData = {
    id?: string;
    attemptId: string;
    taskId: string;
    value: string;
    isCorrect?: boolean;
};

export const createOrUpdateAttemptTaskValue = async (
    token: string,
    createAttemptTaskValueData: AttemptTaskValueData,
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const { attemptId, taskId, value, id, isCorrect } =
        createAttemptTaskValueData;

    try {
        const taskValueData = id
            ? await CmsGqlSdk.UpdateAttemptTaskValue(
                  {
                      updateAttemptTaskValueId: id,
                      data: {
                          Value: value,
                          ...(typeof isCorrect === 'boolean'
                              ? {
                                    IsCorrect: isCorrect,
                                }
                              : {}),
                      },
                  },
                  headers,
              )
            : await CmsGqlSdk.CreateAttemptTaskValue(
                  {
                      data: {
                          Attempt: attemptId,
                          Task: taskId,
                          Value: value,
                          publishedAt: new Date().toISOString(),
                      },
                  },
                  headers,
              );

        const data = (
            (taskValueData as CreateAttemptTaskValueMutation)
                .createAttemptTaskValue ||
            (taskValueData as UpdateAttemptTaskValueMutation)
                .updateAttemptTaskValue
        )?.data;

        if (!data) {
            return null;
        }

        const result: StudentAttemptTaskValue = {
            id: data.id || '',
            Task: data.attributes?.Task?.data?.id || '',
            Value: data.attributes?.Value,
            IsCorrect: data.attributes?.IsCorrect,
            Attempt: data.attributes?.Attempt?.data?.id || '',
        };

        return result;
    } catch (e) {
        return null;
    }
};

type AttemptFilters = {
    userId: string;
    slug?: string;
};

const updateNotPassedAttempts = async <
    T extends
        | LoadAttemptsQuery['attempts']
        | LoadAllAttemptsByIdsQuery['attempts'],
>(
    attempts: T,
    token: string,
): Promise<T> => {
    const needUpdateAttempts = (attempts?.data || []).filter((item) => {
        const { Status, Test, CompletedAt } = item.attributes || {};
        const { CompleteTestBefore } = Test?.data?.attributes || {};
        const completeDate = parseISO(CompleteTestBefore || '');
        return Boolean(
            !CompletedAt &&
                isValidDate(completeDate) &&
                !isFuture(completeDate) &&
                Status !== 'not_passed',
        );
    });
    if (!needUpdateAttempts.length) {
        return attempts;
    }

    const updatedIds = await Promise.all(
        needUpdateAttempts.map((attempt) =>
            updateAttempt(token, {
                attemptId: attempt.id || '',
                Status: 'not_passed',
            }),
        ),
    );

    return {
        ...attempts,
        data: (attempts?.data || []).map((attempt) => {
            if (!updatedIds.includes(attempt.id || '')) {
                return attempt;
            }

            return {
                ...attempt,
                attributes: {
                    ...attempt.attributes,
                    Status: 'not_passed',
                },
            };
        }),
    };
};

export const loadAttempts = async (token: string, filters: AttemptFilters) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const { userId, slug } = filters;

    try {
        const attemptData = await CmsGqlSdk.LoadAttempts(
            {
                filters: {
                    ...(slug
                        ? {
                              slug: {
                                  eq: slug,
                              },
                          }
                        : {
                              Student: {
                                  id: {
                                      eq: userId,
                                  },
                              },
                          }),
                },
                pagination: {
                    limit: 1000,
                },
                publicationState: 'LIVE',
                attemptTaskValuesPublicationState2: 'LIVE',
                attemptTaskValuesPagination2: {
                    limit: 5000,
                },
            },
            headers,
        );

        if (!attemptData.attempts) {
            return null;
        }

        const updatedAttempts = await updateNotPassedAttempts(
            attemptData.attempts,
            token,
        );

        const result: StudentAttempt[] = updatedAttempts.data.map((item) => {
            return {
                id: item.id || '',
                Test: {
                    id: item.attributes?.Test?.data?.id || '',
                    slug: item.attributes?.Test?.data?.attributes?.slug || '',
                },
                Student: item.attributes?.Student?.data?.id || '',
                Status: item.attributes?.Status,
                slug: item.attributes?.slug,
                CompletedAt: item.attributes?.CompletedAt,
                publishedAt: item.attributes?.publishedAt,
                Values: (item.attributes?.AttemptTaskValues?.data || []).map(
                    (value) => {
                        return {
                            id: value.id,
                            Value: value.attributes?.Value,
                            IsCorrect: value.attributes?.IsCorrect,
                            Task: value.attributes?.Task?.data?.id || '',
                            Attempt: value.attributes?.Attempt?.data?.id || '',
                        };
                    },
                ),
            };
        });

        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const loadAllAttempts = async (token: string, userIds: string[]) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const attemptData = await CmsGqlSdk.LoadAllAttemptsByIds(
            {
                filters: {
                    Student: {
                        id: {
                            in: userIds,
                        },
                    },
                },
                pagination: {
                    limit: 1000,
                },
                publicationState: 'LIVE',
                attemptTaskValuesPublicationState2: 'LIVE',
                attemptTaskValuesPagination2: {
                    limit: 1000,
                },
                tasksPublicationState2: 'LIVE',
                tasksPagination2: {
                    limit: 1000,
                },
            },
            headers,
        );

        if (!attemptData.attempts) {
            return null;
        }

        const updatedAttempts = await updateNotPassedAttempts(
            attemptData.attempts,
            token,
        );

        const result: StudentAttemptInfo[] = updatedAttempts.data.map(
            (item) => {
                const status = item.attributes?.Status;
                const correctAttemptTaskValues = (
                    item.attributes?.AttemptTaskValues?.data || []
                ).filter((item) => item.attributes?.IsCorrect).length;
                const tasksCount = (
                    item.attributes?.Test?.data?.attributes?.Tasks?.data || []
                ).length;
                const isAttemptFinished = ![
                    'in_progress',
                    'not_started',
                ].includes(status as string);
                return {
                    id: item.id || '',
                    Test: {
                        id: item.attributes?.Test?.data?.id || '',
                        slug:
                            item.attributes?.Test?.data?.attributes?.slug || '',
                    },
                    Student: item.attributes?.Student?.data?.id || '',
                    Status: item.attributes?.Status,
                    slug: item.attributes?.slug,
                    CompletedAt: item.attributes?.CompletedAt,
                    publishedAt: item.attributes?.publishedAt,
                    tasksCount,
                    ...(isAttemptFinished && tasksCount > 0
                        ? {
                              correctAnswersPercentage: (
                                  (correctAttemptTaskValues / tasksCount) *
                                  100
                              ).toFixed(1),
                          }
                        : {}),
                };
            },
        );

        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const loadAllAttemptValuesCount = async (
    token: string,
    userIds: string[],
) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const attemptValuesData = await CmsGqlSdk.LoadAllAttemptValues(
            {
                filters: {
                    and: [
                        {
                            Student: {
                                id: {
                                    in: userIds,
                                },
                            },
                        },
                        {
                            Status: {
                                in: ['completed'],
                            },
                        },
                    ],
                },
                pagination: {
                    limit: 1000,
                },
                publicationState: 'LIVE',
                attemptTaskValuesPublicationState2: 'LIVE',
                attemptTaskValuesPagination2: {
                    limit: 1000,
                },
            },
            headers,
        );

        if (!attemptValuesData.attempts) {
            return null;
        }

        const result: Record<
            string,
            Record<string, { correctCount: number; wrongCount: number }>
        > = {};

        (attemptValuesData.attempts?.data || []).forEach((attempt) => {
            (attempt?.attributes?.AttemptTaskValues?.data || []).forEach(
                (value) => {
                    const userId = attempt?.attributes?.Student?.data?.id || '';
                    const themeId =
                        value?.attributes?.Task?.data?.attributes?.Theme?.data
                            ?.id || '';
                    const isCorrect = value?.attributes?.IsCorrect || false;

                    if (!themeId || !userId) {
                        return;
                    }

                    const oldResult = result[userId] || {};

                    result[userId] = {
                        ...oldResult,
                        [themeId]: {
                            correctCount:
                                (oldResult && oldResult[themeId]
                                    ? result[userId][themeId].correctCount || 0
                                    : 0) + (isCorrect ? 1 : 0),
                            wrongCount:
                                (oldResult && oldResult[themeId]
                                    ? result[userId][themeId].wrongCount || 0
                                    : 0) + (!isCorrect ? 1 : 0),
                        },
                    };
                },
            );
        });

        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};
