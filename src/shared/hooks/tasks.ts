'use client';
import { useCallback, useState } from 'react';

import { LoadTasksFilters } from '@/shared/api/cms-service';
import { getTasksData, getTasksListData } from '@/shared/server-actions';
import { Task, TasksListItem } from '@/shared/types';

const tasksCache: {
    filters: Record<string, string[]>;
    loadedTasks: Task[];
    tasksList: TasksListItem[];
} = {
    filters: {},
    loadedTasks: [],
    tasksList: [],
};

export const useTasks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingList, setIsLoadingList] = useState(
        tasksCache.tasksList.length === 0,
    );
    const [tasks, setTasks] = useState<Task[]>();
    const [tasksList, setTasksList] = useState<TasksListItem[]>(
        tasksCache.tasksList,
    );

    const loadTasksByFilters = useCallback(
        async (filters: LoadTasksFilters, reloadData = false) => {
            const isForcedToReloadData =
                typeof reloadData !== 'undefined' && reloadData;

            const cachedByFilterData =
                tasksCache.filters[JSON.stringify(filters)];

            if (
                !isForcedToReloadData &&
                cachedByFilterData &&
                cachedByFilterData.length > 0
            ) {
                setTasks(
                    tasksCache.loadedTasks
                        .filter((item) =>
                            cachedByFilterData.includes(item.id || ''),
                        )
                        .sort((a, b) => Number(a.id || 0) - Number(a.id || 0)),
                );
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            const data = await getTasksData(filters);

            if (!data || data.tasks.length === 0) {
                setIsLoading(false);
                return;
            }

            tasksCache.filters[JSON.stringify(filters)] = data.tasks.map(
                (item) => item.id || '',
            );

            const mappedTasks = new Map(
                [...tasksCache.loadedTasks, ...data.tasks].map((item) => [
                    item.id,
                    item,
                ]),
            );
            tasksCache.loadedTasks = Array.from(mappedTasks.values()).sort(
                (a, b) => Number(a.id || 0) - Number(a.id || 0),
            );

            setTasks(data.tasks);
            setIsLoading(false);
        },
        [],
    );

    const loadTasksList = useCallback(async (reloadData = false) => {
        const isForcedToReloadData =
            typeof reloadData !== 'undefined' && reloadData;

        const cachedData = tasksCache.tasksList;

        if (!isForcedToReloadData && cachedData && cachedData.length > 0) {
            setTasks(tasksCache.tasksList);
            setIsLoadingList(false);
            return;
        }

        setIsLoadingList(true);

        const data = await getTasksListData();

        if (!data || data.tasksList.length === 0) {
            setIsLoadingList(false);
            return;
        }

        tasksCache.tasksList = data.tasksList;

        setTasksList(data.tasksList);
        setIsLoadingList(false);
    }, []);

    const getTasksByThemeId = useCallback(
        (themeId: string) => {
            return tasks?.filter((item) => item.themeId === themeId) || [];
        },
        [tasks],
    );

    const getTasksFromListByThemeIds = useCallback(
        (themeIds: string[]) => {
            return (
                tasksList?.filter((item) =>
                    themeIds.includes(item.themeId || ''),
                ) || []
            );
        },
        [tasks],
    );

    return {
        isLoading,
        setIsLoading,
        isLoadingList,

        tasks,
        tasksList,

        getTasksByThemeId,
        getTasksFromListByThemeIds,

        loadTasksByFilters,
        loadTasksList,
    };
};
