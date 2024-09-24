import {
    OrderedTaskTheme,
    OrderedTaskThemeEntity,
    TaskTheme as TaskThemeType,
    TaskThemeEntity,
} from '@/shared/api/cms-service/graphql/types';

export type OrderedExamTheme = Pick<OrderedTaskThemeEntity, 'id'> &
    Pick<OrderedTaskTheme, 'ExamPosition' | 'slug' | 'Title' | 'BlockColor'>;

export type TaskTheme = Pick<TaskThemeEntity, 'id'> &
    Pick<TaskThemeType, 'slug' | 'Title'> & {
        orderedExamThemeId: OrderedTaskThemeEntity['id'];
    };

export type ThemesData = {
    OrderedExamThemes: OrderedExamTheme[];
    TaskThemes: TaskTheme[];
};
