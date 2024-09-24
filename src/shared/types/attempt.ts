import {
    Attempt,
    AttemptEntity,
    AttemptTaskValue,
    AttemptTaskValueEntity,
} from '@/shared/api/cms-service/graphql/types';

export type StudentAttemptTaskValue = Pick<AttemptTaskValueEntity, 'id'> &
    Pick<AttemptTaskValue, 'IsCorrect' | 'Value'> & {
        Task: string;
        Attempt: string;
    };

export type StudentAttempt = Pick<AttemptEntity, 'id'> &
    Pick<Attempt, 'slug' | 'Status' | 'publishedAt' | 'CompletedAt'> & {
        Test: {
            id: string;
            slug: string;
        };
        Student: string;
        Values: StudentAttemptTaskValue[];
        correctAnswersPercentage?: number | string;
        tasksCount?: number;
    };

export type StudentAttemptInfo = Omit<StudentAttempt, 'Values'>;
