'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
    createNewAttempt,
    getAllAttemptsData,
    getAttemptsData,
} from '@/shared/server-actions';
import { StudentAttempt, StudentAttemptInfo } from '@/shared/types/attempt';

export const useAttempts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAllAttempts, setIsLoadingAllAttempts] = useState(true);
    const [allAttemptsInfo, setAllAttemptsInfo] = useState<
        StudentAttemptInfo[]
    >([]);
    const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const loadAttempts = useCallback(
        async (
            slug?: string | null,
            testSlug?: string | null,
            isLoadByTeacher = false,
        ) => {
            setIsLoading(true);

            const data = await getAttemptsData(
                isLoadByTeacher ? slug || '' : undefined,
            );

            if (!data) {
                setIsLoading(false);
                return;
            }

            const attemptBySlug = data.find((item) => item.slug === slug);
            if (!attemptBySlug && testSlug && !isLoadByTeacher) {
                const attemptsByTestSlug = data
                    .filter(
                        (item) =>
                            item.Test.slug === testSlug &&
                            item.Status === 'in_progress',
                    )
                    .sort((a, b) => Number(b.id) - Number(a.id));

                // Если уже есть активные попытки по текущему тесту - берется последняя
                if (attemptsByTestSlug.length > 0) {
                    const attempt = attemptsByTestSlug[0];
                    router.push(
                        pathname +
                            '?' +
                            createQueryString('attempt', attempt.slug || ''),
                    );
                    setAttempts(data);
                    setIsLoading(false);
                    return;
                }

                // Если активных попыток по текущему тесту нет - создается новая
                const newAttempt = await createNewAttempt({
                    testSlug,
                });

                if (newAttempt) {
                    setAttempts([...data, newAttempt]);
                    router.push(
                        pathname +
                            '?' +
                            createQueryString('attempt', newAttempt.slug || ''),
                    );
                    setIsLoading(false);
                    return;
                }
            }

            setAttempts(data);
            setIsLoading(false);
        },
        [],
    );

    const loadAllAttempts = useCallback(async (userId?: string) => {
        setIsLoadingAllAttempts(true);

        const data = await getAllAttemptsData(userId ? [userId] : undefined);

        if (!data) {
            setIsLoadingAllAttempts(false);
            return;
        }

        setAllAttemptsInfo(data);
        setIsLoadingAllAttempts(false);
    }, []);

    const getAttemptBySlug = useCallback(
        (slug: string) => {
            return attempts.find((item) => item.slug === slug);
        },
        [attempts],
    );

    return {
        isLoading,
        isLoadingAllAttempts,

        loadAttempts,
        loadAllAttempts,
        getAttemptBySlug,

        setIsLoadingAllAttempts,

        attempts,
        allAttemptsInfo,
    };
};
