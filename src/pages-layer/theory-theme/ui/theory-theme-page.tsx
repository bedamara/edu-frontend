'use client';
import Link from 'next/link';
import { FC, useEffect } from 'react';

import { useTasks, useTheoryThemes } from '@/shared/hooks';
import { FullPageLoader } from '@/shared/ui';
import { Task } from '@/widgets/task';

const BackToListButton = () => (
    <Link
        href="/profile/theory/"
        className="flex items-center justify-start gap-4 fill-gray-500 text-gray-500 hover:fill-gray-700 hover:text-gray-700 md:pl-10">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
            className="w-4">
            <path
                id="XMLID_92_"
                d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
	l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
	C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
            />
        </svg>
        <span>Назад к списку</span>
    </Link>
);

export const TheoryThemePage: FC<{ slug: string }> = (props) => {
    const { slug } = props;
    const {
        getOpenedData,
        loadOpenedThemeBySlug,
        isLoadingOpened: isLoadingOpenedTheories,
    } = useTheoryThemes();
    const {
        loadTasksByFilters,
        isLoading: isLoadingTasks,
        setIsLoading: setIsLoadingTasks,
        getTasksByThemeId,
        tasks,
    } = useTasks();

    const themesData = getOpenedData();

    useEffect(() => {
        loadOpenedThemeBySlug(slug);
    }, []);

    useEffect(() => {
        if (!isLoadingOpenedTheories) {
            if (themesData && themesData.taskThemes.length > 0) {
                loadTasksByFilters({
                    themeIds: themesData.taskThemes.map(
                        (item) => item.id,
                    ) as string[],
                });
            } else {
                setIsLoadingTasks(false);
            }
        }
    }, [isLoadingOpenedTheories]);

    const showLoader = isLoadingTasks || isLoadingOpenedTheories;

    if (showLoader) {
        return <FullPageLoader />;
    }

    if (!themesData || !tasks) {
        return (
            <div className="m-auto flex size-full flex-col items-center justify-center gap-4">
                <span className="text-xl md:text-2xl">
                    Ошибка при загрузке данных
                </span>
                <Link
                    href="/profile/theory/"
                    className="block w-fit rounded-md bg-slate-700 px-4 py-2 text-white">
                    Вернуться к списку
                </Link>
            </div>
        );
    }

    const { theme, taskThemes } = themesData;

    return (
        <div className="flex flex-col items-center gap-8 md:gap-10 md:py-10">
            <div className="w-full">
                <BackToListButton />
            </div>
            <p className="text-center text-xl font-semibold md:text-4xl">
                {theme.Title}
            </p>
            <div className="flex w-full flex-col items-center gap-8 pb-10 md:px-4">
                {taskThemes.map((item, index) => {
                    const task = getTasksByThemeId(item.id || '')[0];
                    return (
                        <div key={item.slug} className="flex flex-col gap-4">
                            <p className="text-base font-semibold md:pl-10 md:text-xl">
                                {item.Title}
                            </p>
                            <Task taskData={task} />
                            {index !== taskThemes.length - 1 && (
                                <div className="mx-auto mt-4 h-0.5 w-3/4 bg-gray-400" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
