'use client';
import { useCallback, useState } from 'react';

import { getAllTestsData, getTestData } from '@/shared/server-actions';
import { ShowingTest, ShowingTestData } from '@/shared/types';

const testsCache: {
    opendedTests: Record<string, ShowingTestData>;
    loaded: boolean;
} = {
    opendedTests: {},
    loaded: false,
};

type LoadOptions = {
    reloadData?: boolean;
    withoutAnswers?: boolean;
};

export const useShowingTests = (slug?: string) => {
    const [isLoadingOpened, setIsLoadingOpened] = useState(
        !testsCache.opendedTests[slug || ''],
    );

    const [isLoadingAllTests, setIsLoadingAllTests] = useState(true);

    const [allTests, setAllTests] = useState<ShowingTest[]>([]);

    const [openedTest, setOpenedTest] = useState<ShowingTestData | null>(
        slug && testsCache.opendedTests[slug]
            ? testsCache.opendedTests[slug]
            : null,
    );

    const loadOpenedTestBySlug = useCallback(
        async (slug: string, options?: LoadOptions) => {
            const { reloadData, withoutAnswers = true } = options || {};
            const isForcedToReloadData =
                typeof reloadData !== 'undefined' && reloadData;

            const cached = testsCache.opendedTests[slug];
            if (cached && !isForcedToReloadData) {
                setOpenedTest(cached);
                setIsLoadingOpened(false);
                return;
            }

            setIsLoadingOpened(true);

            const data = await getTestData(slug, withoutAnswers);
            if (!data) {
                setIsLoadingOpened(false);
                return;
            }
            testsCache.opendedTests[slug] = data;
            setOpenedTest(data);

            setIsLoadingOpened(false);
        },
        [],
    );

    const loadAllUserTests = useCallback(async (userId?: string) => {
        setIsLoadingOpened(true);

        const data = await getAllTestsData(userId);
        if (!data) {
            setIsLoadingAllTests(false);
            return;
        }
        setAllTests(data);

        setIsLoadingAllTests(false);
    }, []);

    return {
        isLoadingOpened,
        isLoadingAllTests,

        loadOpenedTestBySlug,
        loadAllUserTests,

        openedTest,
        allTests,
    };
};
