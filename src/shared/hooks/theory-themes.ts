'use client';
import { useCallback, useState } from 'react';

import { getThemesData } from '@/shared/server-actions';
import { OrderedExamTheme, ThemesData } from '@/shared/types';

const themesCache: {
    data: ThemesData;
    opendedThemeData: Record<string, ThemesData>;
    loaded: boolean;
    count: number;
} = {
    data: {
        OrderedExamThemes: [],
        TaskThemes: [],
    },
    opendedThemeData: {},
    loaded: false,
    count: 0,
};

export const useTheoryThemes = (slug?: string) => {
    const [isLoading, setIsLoading] = useState(themesCache.count === 0);
    const [isLoadingOpened, setIsLoadingOpened] = useState(
        !themesCache.opendedThemeData[slug || ''],
    );
    const [themes, setThemes] = useState<ThemesData['TaskThemes']>(
        themesCache.data.TaskThemes,
    );
    const [orderedExamThemes, setOrderedExamThemes] = useState<
        ThemesData['OrderedExamThemes']
    >(themesCache.data.OrderedExamThemes);

    const [openedExamThemes, setOpenedExamThemes] = useState<{
        orderedExamThemes: ThemesData['OrderedExamThemes'];
        themes: ThemesData['TaskThemes'];
    } | null>(
        slug && themesCache.opendedThemeData[slug]
            ? {
                  orderedExamThemes:
                      themesCache.opendedThemeData[slug].OrderedExamThemes,
                  themes: themesCache.opendedThemeData[slug].TaskThemes,
              }
            : null,
    );

    const loadAllThemes = useCallback(async (reloadData = false) => {
        const isForcedToReloadData =
            typeof reloadData !== 'undefined' && reloadData;

        if (themesCache.loaded && !isForcedToReloadData) {
            setThemes(themesCache.data.TaskThemes);
            setOrderedExamThemes(themesCache.data.OrderedExamThemes);
            setIsLoading(false);
            return {
                orderedExamThemes: themesCache.data.TaskThemes,
                themes: themesCache.data.OrderedExamThemes,
            };
        }

        setIsLoading(true);

        const data = await getThemesData();

        if (!data) {
            setIsLoading(false);
            return;
        }
        themesCache.data = data;
        themesCache.loaded = true;
        themesCache.count += 1;
        setThemes(data.TaskThemes);
        setOrderedExamThemes(data.OrderedExamThemes);
        setIsLoading(false);
        return {
            orderedExamThemes: data.TaskThemes,
            themes: data.OrderedExamThemes,
        };
    }, []);

    const loadOpenedThemeBySlug = useCallback(
        async (slug: string, reloadData = false) => {
            const isForcedToReloadData =
                typeof reloadData !== 'undefined' && reloadData;

            const cached = themesCache.opendedThemeData[slug];

            if (cached && !isForcedToReloadData) {
                setOpenedExamThemes({
                    orderedExamThemes: cached.OrderedExamThemes,
                    themes: cached.TaskThemes,
                });
                setIsLoadingOpened(false);
                return;
            }

            setIsLoadingOpened(true);

            const data = await getThemesData(slug);

            if (!data) {
                setIsLoadingOpened(false);
                return;
            }
            themesCache.opendedThemeData[slug] = data;

            setOpenedExamThemes({
                orderedExamThemes: data.OrderedExamThemes,
                themes: data.TaskThemes,
            });

            setIsLoadingOpened(false);
        },
        [],
    );

    const getAllExamTaskThemesById = useCallback(
        (orderedExamThemeId: OrderedExamTheme['id']) => {
            return themes.filter(
                (item) => item.orderedExamThemeId === orderedExamThemeId,
            );
        },
        [themes],
    );

    const getOpenedData = useCallback(() => {
        if (openedExamThemes)
            return {
                theme: openedExamThemes.orderedExamThemes[0],
                taskThemes: openedExamThemes.themes,
            };
    }, [openedExamThemes]);

    return {
        isLoading,
        isLoadingOpened,

        loadOpenedThemeBySlug,
        loadAllThemes,

        getAllExamTaskThemesById,
        getOpenedData,

        orderedExamThemes,
        themes,
    };
};
