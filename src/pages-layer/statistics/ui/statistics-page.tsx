'use client';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react';

import { isTeacherRole } from '@/shared/helpers';
import { useTheoryThemes } from '@/shared/hooks';
import { useProfileStore } from '@/shared/providers';
import { getAttemptValuesStatistics } from '@/shared/server-actions';
import { SchoolClass } from '@/shared/types';
import { FullPageLoader } from '@/shared/ui';
import { StatisticsChart, StatisticsData } from '@/widgets/statistics-chart';

type Props = {
    classItem: SchoolClass;
    teacherId: string;
    data: Array<StatisticsData>;
};
const StatisticsList: FC<Props> = (props) => {
    const { classItem, data } = props;
    const {
        Name,
        School: { Name: SchoolName },
        Students,
    } = classItem;
    return (
        <div className="flex flex-col gap-8">
            <p className="w-full text-center text-2xl font-semibold">
                Класс: {Name}{' '}
                <span className="text-xl font-light">({SchoolName})</span>
            </p>
            {Students.map((student) => {
                const studName = `${student.lastName}\u00A0${student.firstName[0].toUpperCase()}.`;
                const statData = data.find(
                    (item) => item.userId === student.id,
                );
                if (!statData) {
                    return null;
                }

                return (
                    <div
                        key={student.id}
                        className="flex flex-col gap-4 rounded-md bg-slate-100 p-4">
                        <span className="text-center text-lg font-semibold md:text-2xl">
                            {'Результаты ученика: ' + studName}
                        </span>
                        <StatisticsChart data={statData} />
                    </div>
                );
            })}
        </div>
    );
};

export const StatisticsPage: FC<ComponentPropsWithoutRef<'div'>> = () => {
    const { data } = useSession();
    const classes = useProfileStore((store) => store.classes);
    const isTeacher = isTeacherRole(data);
    const { loadAllThemes, isLoading: isLoadingThemes } = useTheoryThemes();
    const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);
    const [statisticsData, setStatisticsData] = useState<Array<StatisticsData>>(
        [],
    );

    const initialLoading = async () => {
        setIsLoadingStatistics(true);
        const students = isTeacher
            ? classes.reduce((prev, classItem) => {
                  return [
                      ...prev,
                      ...classItem.Students.map((stud) => stud.id || ''),
                  ];
              }, [] as string[])
            : undefined;
        const [statisticsData, themesData] = await Promise.all([
            getAttemptValuesStatistics(students),
            loadAllThemes(),
        ]);

        if (!statisticsData || !themesData) {
            return setIsLoadingStatistics(false);
        }

        const { themes, orderedExamThemes } = themesData;

        const themesWithExamPosition = orderedExamThemes
            .map((item) => {
                const theme = themes.find(
                    (t) => t.id === item.orderedExamThemeId,
                );
                if (!theme) {
                    return null;
                }
                return {
                    themeId: item.id || '',
                    examPosition: theme.ExamPosition || 0,
                };
            })
            .filter((item) => !!item);

        setStatisticsData(
            Object.entries(statisticsData).reduce((prev, [userId, data]) => {
                return [
                    ...prev,
                    {
                        userId,
                        statistics: Object.entries(data)
                            .reduce(
                                (prev, [themeId, params]) => {
                                    const examTheme =
                                        themesWithExamPosition.find(
                                            (t) =>
                                                (t || {}).themeId === themeId,
                                        );
                                    if (!examTheme) {
                                        return prev;
                                    }
                                    const recordWithSamePosition =
                                        prev.findIndex(
                                            (rec) =>
                                                rec.examPosition ===
                                                examTheme.examPosition,
                                        );

                                    if (recordWithSamePosition !== -1) {
                                        prev[recordWithSamePosition] = {
                                            ...prev[recordWithSamePosition],
                                            wrongCount:
                                                prev[recordWithSamePosition]
                                                    .wrongCount +
                                                params.wrongCount,
                                            correctCount:
                                                prev[recordWithSamePosition]
                                                    .correctCount +
                                                params.correctCount,
                                        };
                                        return prev;
                                    }

                                    prev.push({
                                        name: String(examTheme.examPosition),
                                        examPosition: examTheme.examPosition,
                                        wrongCount: params.wrongCount,
                                        correctCount: params.correctCount,
                                    });

                                    return prev;
                                },
                                themes.map((item) => ({
                                    name: String(item.ExamPosition),
                                    examPosition: item.ExamPosition,
                                    wrongCount: 0,
                                    correctCount: 0,
                                })) as StatisticsData['statistics'],
                            )
                            .filter((item) => !!item)
                            .sort((a, b) => Number(a) - Number(b)),
                    },
                ];
            }, [] as StatisticsData[]),
        );

        setIsLoadingStatistics(false);
    };

    useEffect(() => {
        initialLoading();
    }, []);

    if (isLoadingThemes || isLoadingStatistics) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex flex-col gap-12 pb-4">
            {isTeacher ? (
                <>
                    {classes.map((item) => (
                        <StatisticsList
                            key={item.id}
                            classItem={item}
                            teacherId={data?.user?.id || ''}
                            data={statisticsData}
                        />
                    ))}
                </>
            ) : statisticsData[0] ? (
                <div className="mt-20 flex flex-col gap-4 rounded-md bg-slate-100 p-4">
                    <span className="text-center text-2xl font-semibold">
                        Ваша статистика
                    </span>
                    <StatisticsChart data={statisticsData[0]} />
                </div>
            ) : null}
        </div>
    );
};
