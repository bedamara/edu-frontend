'use client';
import { isFuture, isValid as isValidDate } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';
import { ShowingTest } from '@/shared/types';
import { StudentAttemptInfo } from '@/shared/types/attempt';

const commonStyles = cn(
    'block w-full rounded-lg px-4 py-2 transition delay-150 md:w-fit',
);

export const ItemButton: FC<
    ComponentPropsWithoutRef<'button'> & {
        test: ShowingTest;
        attempt?: StudentAttemptInfo;
        isTeacherTest?: boolean;
    }
> = (props) => {
    const { test, attempt, className, isTeacherTest } = props;
    const router = useRouter();
    const status = attempt?.Status;
    const completeTestBeforeDate = new Date(test.CompleteTestBefore || '');
    const isOutdated =
        isValidDate(completeTestBeforeDate) &&
        !isFuture(completeTestBeforeDate);

    const onContinueTest = () => {
        const { slug: testSlug } = test;
        const { slug: attemptSlug } = attempt || {};
        router.push(`/profile/test/${testSlug}/?attempt=${attemptSlug}`);
    };

    const onStartTest = () => {
        const { slug: testSlug } = test;
        router.push(`/profile/test/${testSlug}/`);
    };

    if (status === 'completed') {
        return (
            <button
                className={cn(
                    commonStyles,
                    'bg-amber-200 hover:bg-amber-300',
                    className,
                )}
                onClick={onContinueTest}>
                Результаты
            </button>
        );
    }

    if (status === 'in_progress') {
        return (
            <button
                onClick={onContinueTest}
                className={cn(
                    commonStyles,
                    'bg-amber-200 hover:bg-amber-300',
                    className,
                )}>
                Продолжить
            </button>
        );
    }

    if (status === 'not_passed' || (isOutdated && !attempt && !isTeacherTest)) {
        return (
            <button
                disabled
                className={cn(commonStyles, 'bg-rose-300 ', className)}>
                Не пройден
            </button>
        );
    }

    return (
        <button
            className={cn(
                commonStyles,
                'bg-lime-200 hover:bg-lime-300',
                className,
            )}
            onClick={onStartTest}>
            {isTeacherTest ? 'Посмотреть тест' : 'Начать тест'}
        </button>
    );
};
