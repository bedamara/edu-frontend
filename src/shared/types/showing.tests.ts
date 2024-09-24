import { Test, TestEntity } from '@/shared/api/cms-service/graphql/types';
import { Task } from '@/shared/types/tasks';

export type ShowingTest = Pick<TestEntity, 'id'> &
    Pick<
        Test,
        'CompleteTestBefore' | 'AvailableAttempts' | 'publishedAt' | 'slug'
    > & {
        AssignedTo: string[];
        MadeBy: string;
        Tasks: string[];
    };

export type ShowingTestData = {
    tasks: Task[];
    test: ShowingTest;
};
