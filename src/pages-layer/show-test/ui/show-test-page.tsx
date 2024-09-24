'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';

import { ShowingTest } from '@/features/showing-test';
import { isTeacherRole } from '@/shared/helpers';
import { useAttempts, useShowingTests } from '@/shared/hooks';
import { Button, FullPageLoader } from '@/shared/ui';

export const ShowTestPage: FC<{ slug: string }> = (props) => {
    const { slug: testSlug } = props;
    const searchParams = useSearchParams();
    const attemptSlug = searchParams.get('attempt');
    const { data } = useSession();
    const isTeacher = isTeacherRole(data);
    const router = useRouter();

    const { loadOpenedTestBySlug, isLoadingOpened, openedTest } =
        useShowingTests(testSlug);
    const {
        loadAttempts,
        isLoading: isLoadingAttempts,
        getAttemptBySlug,
    } = useAttempts();

    useEffect(() => {
        loadOpenedTestBySlug(testSlug);
        loadAttempts(attemptSlug, testSlug, isTeacher);
    }, []);

    if (isLoadingOpened || isLoadingAttempts) {
        return <FullPageLoader />;
    }

    if (!openedTest) {
        return (
            <div className="m-auto flex size-full flex-col items-center justify-center gap-4">
                <span className="text-xl md:text-2xl">
                    Ошибка при загрузке теста
                </span>
                <Button onClick={() => router.refresh()}>
                    Перезагрузить страницу
                </Button>
            </div>
        );
    }

    const currentAttempt = attemptSlug ? getAttemptBySlug(attemptSlug) : null;
    const isAllowed =
        (openedTest.test.AssignedTo.includes(data?.user?.id || '') &&
            currentAttempt?.Status !== 'not_passed') ||
        openedTest.test.MadeBy === data?.user?.id;

    if (!isAllowed) {
        return (
            <div className="m-auto flex size-full flex-col items-center justify-center gap-4">
                <span className="text-xl md:text-2xl">
                    Данный тест не доступен
                </span>
                <Link
                    href="/profile/"
                    className="block w-fit rounded-md bg-slate-700 px-4 py-2 text-white">
                    Вернуться на главную
                </Link>
            </div>
        );
    }

    const isWatchMode = Boolean(
        isTeacher ||
            (currentAttempt && currentAttempt.Status !== 'in_progress'),
    );

    return (
        <ShowingTest
            openedTest={openedTest}
            attempt={currentAttempt}
            watchMode={isWatchMode}
            isOpenedByTeacher={isTeacher}
        />
    );
};
