'use client';
import {
    format,
    formatDistance,
    formatDistanceToNow,
    isFuture,
    isValid as dateIsValid,
    parseISO,
} from 'date-fns';
import { isValid as isValidDate } from 'date-fns/isValid';
import { ru as ruLocale } from 'date-fns/locale/ru';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC, useEffect, useMemo } from 'react';

import { useAttempts, useShowingTests } from '@/shared/hooks';
import { cn } from '@/shared/lib/tw-merge';
import { useProfileStore } from '@/shared/providers';
import { ShowingTest, StudentType, TeacherType } from '@/shared/types';
import { StudentAttemptInfo } from '@/shared/types/attempt';
import { Button, TestListItem, TestListItemSkeleton } from '@/shared/ui';
import { TestListHeader } from '@/shared/ui/test-list';

type Props = ComponentPropsWithoutRef<'div'> & {
    title?: string;
    userId?: string;
    onlyTeacherTests?: boolean;
    onlyTestsCreatedBy?: string;
    showCreateBtnOnEmpty?: boolean;
    showTasksCount?: boolean;
    filterByActivity?: 'active' | 'notActive';
};

export const TestsList: FC<Props> = (props) => {
    const {
        title,
        onlyTeacherTests,
        onlyTestsCreatedBy,
        className,
        showCreateBtnOnEmpty,
        filterByActivity,
        showTasksCount,
    } = props;
    const { loadAllUserTests, isLoadingAllTests, allTests } = useShowingTests();
    const {
        loadAllAttempts,
        isLoadingAllAttempts,
        allAttemptsInfo,
        setIsLoadingAllAttempts,
    } = useAttempts();
    const classes = useProfileStore((store) => store.classes);
    const { data } = useSession();
    const userId = props.userId || data?.user?.id;

    useEffect(() => {
        loadAllUserTests(userId);
        if (onlyTeacherTests) {
            setIsLoadingAllAttempts(false);
        } else {
            loadAllAttempts(userId);
        }
    }, []);

    const testsList = useMemo(() => {
        const getFio = (user?: StudentType | TeacherType) =>
            !user
                ? null
                : `${user.lastName} ${user.firstName[0].toUpperCase()}. ${user.lastName[0].toUpperCase()}.`;

        const getCreationDate = (dateString?: string) => {
            if (!dateString) {
                return null;
            }

            const date = new Date(dateString);
            if (!dateIsValid(date)) {
                return null;
            }
            return format(date, 'dd.MM.yyyy');
        };

        const getCompleteBeforeDate = (
            dateString?: string,
            isAttemptFinished = false,
        ) => {
            if (!dateString) {
                return null;
            }
            const date = parseISO(dateString);

            if (!dateIsValid(date)) {
                return null;
            }

            return {
                date: format(date, 'dd.MM.yyyy'),
                ...(isFuture(date) && !isAttemptFinished
                    ? {
                          timeLeft: formatDistanceToNow(date, {
                              locale: ruLocale,
                              includeSeconds: false,
                          }),
                      }
                    : {}),
            };
        };

        const getCompletedAtTime = (attempt: StudentAttemptInfo) => {
            const startDate = parseISO(attempt.publishedAt);
            const finishDate = parseISO(attempt.CompletedAt);
            if (!dateIsValid(startDate) || !dateIsValid(finishDate)) {
                return null;
            }

            return formatDistance(startDate, finishDate, {
                locale: ruLocale,
                includeSeconds: false,
            });
        };

        return allTests.map((test) => {
            const attempt = allAttemptsInfo.find(
                (item) => item.Test.id === test.id,
            );
            const teacher = (
                classes.find((item) => item.Teacher.id === test.MadeBy) || {}
            ).Teacher;

            const isAttemptFinished = ['completed', 'not_passed'].includes(
                attempt?.Status || '',
            );

            return {
                test,
                attempt,
                showingData: {
                    isAttemptFinished,
                    madeBy:
                        test.MadeBy === userId && !onlyTeacherTests
                            ? 'Вы'
                            : getFio(teacher),
                    createdAt: getCreationDate(test.publishedAt),
                    completeBefore: getCompleteBeforeDate(
                        test.CompleteTestBefore,
                        isAttemptFinished,
                    ),
                    tasksCount: test.Tasks.length,
                    assignedCount: test.AssignedTo.length,
                    completedIn:
                        !isAttemptFinished ||
                        onlyTeacherTests ||
                        !attempt?.CompletedAt
                            ? null
                            : getCompletedAtTime(attempt),
                    correctAnswersPercentage: isAttemptFinished
                        ? attempt?.correctAnswersPercentage
                        : null,
                },
            };
        });
    }, [onlyTeacherTests, allTests, allAttemptsInfo, classes, userId]);

    const filterTestByActivity = (
        attempt?: StudentAttemptInfo,
        test?: ShowingTest,
    ) => {
        if (!filterByActivity) {
            return true;
        }
        const completeTestBeforeDate = new Date(test?.CompleteTestBefore || '');

        const isOutdated =
            isValidDate(completeTestBeforeDate) &&
            !isFuture(completeTestBeforeDate);

        if (filterByActivity === 'active') {
            return Boolean(
                !isOutdated &&
                    (!attempt ||
                        ['in_progress', 'not_started'].includes(
                            attempt.Status as string,
                        )),
            );
        } else {
            return Boolean(
                isOutdated ||
                    (attempt &&
                        !['in_progress', 'not_started'].includes(
                            attempt.Status as string,
                        )),
            );
        }
    };

    const isCreatedBy = (id?: string, test?: ShowingTest) => {
        if (!id) {
            return true;
        }

        return test?.MadeBy === id;
    };

    const showingTests = testsList
        .filter((item) => isCreatedBy(onlyTestsCreatedBy, item.test))
        .filter((item) => filterTestByActivity(item.attempt, item.test))
        .sort((a, b) => Number(b.test.id) - Number(a.test.id))
        .map((item, index) => (
            <TestListItem
                key={index}
                data={item}
                isTeacherTest={onlyTeacherTests}
                showTasksCount={showTasksCount}
            />
        ));

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <span className="text-center text-lg font-semibold md:text-2xl">
                {title}
            </span>
            <TestListHeader
                isTeacherTests={onlyTeacherTests}
                showTasksCount={showTasksCount}
            />
            <div className="flex h-full flex-col gap-4 overflow-y-scroll md:rounded-md">
                {isLoadingAllTests || isLoadingAllAttempts ? (
                    [1, 2, 3, 4].map((index) => (
                        <TestListItemSkeleton key={index} />
                    ))
                ) : showingTests.length > 0 ? (
                    <>{showingTests}</>
                ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-4 bg-slate-200 mobile:min-h-64 mobile:rounded-md">
                        <span className="text-xl">Тесты не найдены</span>
                        {showCreateBtnOnEmpty && (
                            <Button variant="link" href="/profile/create-test/">
                                Создать тест
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
