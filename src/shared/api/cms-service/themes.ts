import { ThemesData } from '@/shared/types';

import { CmsGqlSdk } from './graphql';

export const loadThemesData = async (
    token: string,
    slug?: string,
): Promise<ThemesData | null> => {
    try {
        const resultData: ThemesData = {
            OrderedExamThemes: [],
            TaskThemes: [],
        };

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const themesData = await CmsGqlSdk.LoadThemesData(
            {
                sort: 'ExamPosition',
                publicationState: 'LIVE',
                pagination: {
                    limit: 100,
                },
                ...(slug
                    ? {
                          filters: {
                              slug: {
                                  eq: slug,
                              },
                          },
                          taskThemesFilters2: {
                              OrderedTaskTheme: {
                                  slug: {
                                      eq: slug,
                                  },
                              },
                          },
                      }
                    : ({} as any)),

                taskThemesPagination2: {
                    limit: 200,
                },
                taskThemesPublicationState2: 'LIVE',
            },
            headers,
        );

        (themesData.taskThemes?.data || []).forEach((item) => {
            resultData.TaskThemes.push({
                id: item.id,
                orderedExamThemeId:
                    item.attributes?.OrderedTaskTheme?.data?.id || '',
                slug: item.attributes?.slug || '',
                Title: item.attributes?.Title || '',
            });
        });
        (themesData.orderedTaskThemes?.data || []).forEach((item) => {
            resultData.OrderedExamThemes.push({
                id: item.id,
                slug: item.attributes?.slug || '',
                Title: item.attributes?.Title || '',
                ExamPosition: item.attributes?.ExamPosition,
                BlockColor: item.attributes?.BlockColor,
            });
        });

        return resultData;
    } catch (error) {
        return null;
    }
};
