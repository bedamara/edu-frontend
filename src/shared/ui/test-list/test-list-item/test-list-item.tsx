'use client';
import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';
import { ShowingTest } from '@/shared/types';
import { StudentAttemptInfo } from '@/shared/types/attempt';

import {
    CompleteBefore,
    CompletePercentage,
    CompleteTime,
    ItemButton,
    ParamWrapper,
} from './params';

type Props = ComponentPropsWithoutRef<'div'> & {
    isTeacherTest?: boolean;
    showTasksCount?: boolean;
    data: {
        test: ShowingTest;
        attempt?: StudentAttemptInfo;
        showingData: {
            isAttemptFinished: boolean;
            tasksCount: number;
            assignedCount: number;
            madeBy?: string | null;
            createdAt?: string | null;
            completeBefore?: {
                date: string;
                timeLeft?: string;
            } | null;
            completedIn?: string | null;
            correctAnswersPercentage?: string | number | null;
        };
    };
};

export const TestListItemSkeleton = () => {
    const basePulseBlockClasses = cn(
        'h-6 animate-pulse rounded-md bg-slate-400 md:h-4',
    );
    const basePulseBlockContainerClasses = cn(
        'flex h-full flex-col items-start justify-center gap-1 md:items-center',
    );
    return (
        <div className="grid h-240px w-full grid-cols-2 gap-4 rounded-lg bg-slate-200 p-4 text-sm md:h-100px md:grid-cols-24 md:grid-rows-1 md:gap-2 md:py-8">
            <div
                className={cn(basePulseBlockContainerClasses, 'mobile:hidden')}>
                <div className={cn(basePulseBlockClasses, 'w-6')} />
            </div>

            <div
                className={cn(
                    basePulseBlockContainerClasses,
                    'col-span-2 md:col-span-7',
                )}>
                <div className={cn(basePulseBlockClasses, 'w-32')} />
            </div>

            <div
                className={cn(basePulseBlockContainerClasses, 'md:col-span-2')}>
                <div className={cn(basePulseBlockClasses, 'w-24')} />
            </div>

            <div
                className={cn(basePulseBlockContainerClasses, 'md:col-span-5')}>
                <div className={cn(basePulseBlockClasses, 'w-24')} />
            </div>

            <div
                className={cn(basePulseBlockContainerClasses, 'md:col-span-3')}>
                <div className={cn(basePulseBlockClasses, 'w-10')} />
            </div>

            <div
                className={cn(basePulseBlockContainerClasses, 'md:col-span-2')}>
                <div className={cn(basePulseBlockClasses, 'w-10')} />
            </div>

            <div
                className={cn(
                    basePulseBlockContainerClasses,
                    'col-span-2 md:col-span-4',
                )}>
                <div
                    className={cn(
                        basePulseBlockClasses,
                        'h-9 w-full md:h-8 md:w-36',
                    )}
                />
            </div>
        </div>
    );
};

export const TestListItem: FC<Props> = (props) => {
    const {
        data: { test, showingData, attempt },
        isTeacherTest,
        showTasksCount,
    } = props;

    const {
        madeBy,
        createdAt,
        correctAnswersPercentage,
        completedIn,
        completeBefore,
        tasksCount,
        assignedCount,
    } = showingData;

    return (
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-200 p-4 text-sm md:grid-cols-24 md:grid-rows-1 md:gap-2 md:py-8">
            <ParamWrapper className="hidden md:block">
                {test.id || '-'}
            </ParamWrapper>
            <ParamWrapper className="col-span-2 md:col-span-7" subTitle="Автор">
                {madeBy || '-'}
            </ParamWrapper>
            <ParamWrapper className="md:col-span-2" subTitle="Создан">
                {createdAt || '-'}
            </ParamWrapper>
            {!isTeacherTest && showTasksCount ? (
                <ParamWrapper className="md:col-span-5" subTitle="Кол-во задач">
                    {tasksCount}
                </ParamWrapper>
            ) : (
                <ParamWrapper
                    className="md:col-span-5"
                    subTitle="Выполняется до">
                    <CompleteBefore
                        status={attempt?.Status}
                        before={completeBefore}
                    />
                </ParamWrapper>
            )}
            {isTeacherTest ? (
                <>
                    <ParamWrapper
                        className="md:col-span-3"
                        subTitle="Кол-во задач">
                        {tasksCount}
                    </ParamWrapper>
                    <ParamWrapper
                        className="md:col-span-2"
                        subTitle="Кол-во учеников">
                        {assignedCount}
                    </ParamWrapper>
                </>
            ) : (
                <>
                    <ParamWrapper
                        className="md:col-span-3"
                        subTitle="Выполнен за">
                        <CompleteTime data={completedIn} />
                    </ParamWrapper>
                    <ParamWrapper
                        className="md:col-span-2"
                        subTitle="Правильных ответов">
                        {attempt?.Status !== 'not_passed' ? (
                            <CompletePercentage
                                data={correctAnswersPercentage}
                            />
                        ) : (
                            '-'
                        )}
                    </ParamWrapper>
                </>
            )}
            <ParamWrapper className="col-span-2 md:col-span-4">
                <ItemButton
                    test={test}
                    attempt={attempt}
                    isTeacherTest={isTeacherTest}
                />
            </ParamWrapper>
        </div>
    );
};
