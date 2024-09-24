'use client';
import { FC, useEffect } from 'react';

import { CreateTestForm } from '@/features/create-test-form';
import { useTasks, useTheoryThemes } from '@/shared/hooks';
import { FullPageLoader } from '@/shared/ui';

export const CreateTestPage: FC = (props) => {
    const { loadAllThemes, isLoading } = useTheoryThemes();
    const { loadTasksList, isLoadingList } = useTasks();

    useEffect(() => {
        loadAllThemes();
        loadTasksList();
    }, []);

    if (isLoading || isLoadingList) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex flex-col items-center gap-8 md:gap-10 md:px-4 md:py-10">
            <CreateTestForm />
        </div>
    );
};
