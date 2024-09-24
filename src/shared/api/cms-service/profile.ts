import { CmsGqlSdk } from '@/shared/api/cms-service/graphql';
import { auth } from '@/shared/lib/next-auth';
import { SchoolClass } from '@/shared/types';

export const loadClassesData = async (userId: string, token: string) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const classesData = await CmsGqlSdk.LoadClassesData(
            {
                publicationState: 'LIVE',
                filters: {
                    or: [
                        {
                            Students: {
                                id: {
                                    eq: userId,
                                },
                            },
                        },
                        {
                            Teacher: {
                                id: {
                                    eq: userId,
                                },
                            },
                        },
                    ],
                },
                pagination: {
                    limit: 100,
                },
            },
            headers,
        );

        const resultData: SchoolClass[] = (classesData.classes?.data || []).map(
            (item) => {
                return {
                    Name: item.attributes?.Name || '',
                    id: item.id,
                    School: {
                        id: item.attributes?.School?.data?.id || '',
                        Name:
                            item.attributes?.School?.data?.attributes?.Name ||
                            '',
                    },
                    Students: (item.attributes?.Students?.data || []).map(
                        (student) => ({
                            id: student.id,
                            firstName: student?.attributes?.firstName || '',
                            lastName: student?.attributes?.lastName || '',
                            email: student?.attributes?.email || '',
                        }),
                    ),
                    Teacher: {
                        id: item?.attributes?.Teacher?.data?.id || '',
                        firstName:
                            item?.attributes?.Teacher?.data?.attributes
                                ?.firstName || '',
                        lastName:
                            item?.attributes?.Teacher?.data?.attributes
                                ?.lastName || '',
                        middleName:
                            item?.attributes?.Teacher?.data?.attributes
                                ?.middleName || '',
                        email:
                            item?.attributes?.Teacher?.data?.attributes
                                ?.email || '',
                    },
                };
            },
        );

        return resultData;
    } catch (error) {
        return null;
    }
};

export const getProfileData = async () => {
    const session = await auth();

    const userId = session && session.user.id;
    const token = session && session.token;

    if (!userId || !token) {
        return null;
    }

    try {
        return await loadClassesData(userId, token);
    } catch (e) {
        console.log(e);
        return null;
    }
};
