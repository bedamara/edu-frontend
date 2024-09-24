import { Task, TaskFile, TasksData, TasksListData } from '@/shared/types';

import { CmsGqlSdk } from './graphql';

export type LoadTasksFilters = {
    themeIds?: string[];
    taskIds?: string[];
};

export const loadTasksData = async (
    token: string,
    filters: LoadTasksFilters,
    withoutAnswers = false,
): Promise<TasksData | null> => {
    try {
        const resultData: TasksData = {
            tasks: [],
        };

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const { themeIds, taskIds } = filters;

        const tasksData = await CmsGqlSdk.LoadTasksData(
            {
                pagination: {
                    limit: 5000,
                },
                publicationState: 'LIVE',
                filters: {
                    ...(themeIds
                        ? {
                              Theme: {
                                  id: {
                                      in: themeIds,
                                  },
                              },
                          }
                        : ({} as any)),
                    ...(taskIds
                        ? {
                              id: {
                                  in: taskIds,
                              },
                          }
                        : ({} as any)),
                },
                sort: 'id',
            },
            headers,
        );

        (tasksData.tasks?.data || []).forEach((item) => {
            resultData.tasks.push({
                id: item.id,
                themeId: item.attributes?.Theme?.data?.id || '',
                slug: item.attributes?.slug || '',
                Description: item.attributes?.Description,
                examPosition:
                    item.attributes?.Theme?.data?.attributes?.OrderedTaskTheme
                        ?.data?.attributes?.ExamPosition || 0,

                ...(!withoutAnswers
                    ? {
                          Answer: item.attributes?.Answer || '',
                          AnswerDescription: item.attributes?.AnswerDescription,
                      }
                    : {}),

                ...(item.attributes?.File?.data
                    ? {
                          file: {
                              id: item.attributes?.File?.data?.id || '',
                              url: item.attributes?.File?.data?.attributes?.url
                                  ? `${process.env.CMS_DOMAIN_FOR_FILES}${item.attributes?.File?.data?.attributes?.url}`
                                  : '',
                              caption:
                                  item.attributes?.File?.data?.attributes
                                      ?.caption || '',
                              alternativeText:
                                  item.attributes?.File?.data?.attributes
                                      ?.alternativeText || '',
                          },
                      }
                    : ({} as TaskFile)),
            } as Task);
        });

        return resultData;
    } catch (error) {
        return null;
    }
};

export const loadTasksList = async (
    token: string,
): Promise<TasksListData | null> => {
    try {
        const resultData: TasksListData = {
            tasksList: [],
        };

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const tasksData = await CmsGqlSdk.LoadTasksList(
            {
                pagination: {
                    limit: 5000,
                },
                publicationState: 'LIVE',
                sort: 'id',
            },
            headers,
        );

        (tasksData.tasks?.data || []).forEach((item) => {
            resultData.tasksList.push({
                id: item.id,
                themeId: item.attributes?.Theme?.data?.id || '',
            });
        });

        return resultData;
    } catch (error) {
        return null;
    }
};
