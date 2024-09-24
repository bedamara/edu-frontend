import { OrderedExamTheme, TaskTheme } from '@/shared/types';

export type FormValues = {
    tasks: {
        examTheme: OrderedExamTheme;
        themes: {
            theme: TaskTheme;
            enabled: boolean;
            tasksCount: number;
            themeId: string;
        }[];
        tasksCount: number;
    }[];
    students: {
        classId: string;
        studentId: string;
        name: string;
        enabled: boolean;
    }[];
    completeBefore: string | null;
};
