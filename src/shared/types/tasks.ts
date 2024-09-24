import {
    Task as TaskType,
    TaskEntity,
    TaskThemeEntity,
    UploadFile,
    UploadFileEntity,
} from '@/shared/api/cms-service/graphql/types';

export type NormalText = {
    type: 'text';
    text: string;
};

export type BoldText = {
    type: 'text';
    bold: true;
    text: string;
};

export type Paragraph = {
    type: 'paragraph';
    children: Array<NormalText | BoldText>;
};

export type Image = {
    type: 'image';
    image: {
        url: string;
        caption?: string;
        alternativeText?: string;
    };
    children: Array<{
        type: 'text';
        text: string;
    }>;
};

export type CodeExample = {
    type: 'code';
    children: Array<{
        type: 'text';
        text: string;
    }>;
};

export type DescriptionData = Array<Image | Paragraph | CodeExample>;

export type TaskFile = Pick<UploadFileEntity, 'id'> &
    Pick<UploadFile, 'url' | 'alternativeText' | 'caption'>;

export type Task = Pick<TaskEntity, 'id'> &
    Pick<TaskType, 'Answer' | 'slug'> & {
        AnswerDescription?: DescriptionData;
        Description?: DescriptionData;
        file?: TaskFile;
        themeId: TaskThemeEntity['id'];
        examPosition?: number;
    };

export type TasksData = {
    tasks: Task[];
};

export type TasksListItem = Pick<TaskEntity, 'id'> & {
    themeId: TaskThemeEntity['id'];
};

export type TasksListData = {
    tasksList: TasksListItem[];
};
