import {
    OrderedExamTheme,
    SchoolClass,
    TasksListItem,
    TaskTheme,
} from '@/shared/types';

import { FormValues } from './types';

export const getDefaultValues = (
    orderedExamThemes: OrderedExamTheme[],
    themes: TaskTheme[],
    tasksList: TasksListItem[],
    classes: SchoolClass[],
): FormValues => {
    return {
        tasks: orderedExamThemes.map((examTheme) => {
            return {
                tasksCount: 0,
                examTheme,
                themes: themes
                    .filter((item) => item.orderedExamThemeId === examTheme.id)
                    .map((theme) => {
                        return {
                            theme,
                            enabled: true,
                            themeId: theme.id || '',
                            tasksCount: tasksList.filter(
                                (item) => item.themeId === theme.id,
                            ).length,
                        };
                    }),
            };
        }),
        students: classes.reduce(
            (prev, currentClass) => {
                const studs = currentClass.Students.map((item) => ({
                    studentId: item.id || '',
                    name: `${item.lastName} ${item.firstName[0]}.`,
                    classId: currentClass.id || '',
                    enabled: false,
                }));
                return [...prev, ...studs];
            },
            [] as FormValues['students'],
        ),
        completeBefore: '',
    };
};
