import * as z from 'zod';

import { OrderedExamTheme, TaskTheme } from '@/shared/types';

export const answerTestFormClientSchema = z.object({
    answers: z.array(
        z.object({
            taskId: z.string().readonly(),
            value: z.string().optional(),
            attemptValueId: z.string().optional(),
            isCorrect: z.boolean().nullish(),
        }),
    ),
});

export type FormValues = {
    answers: {
        taskId: string;
        value?: string;
        attemptValueId?: string;
        isCorrect?: boolean | null;
    }[];
};

export const completeTestFormServerSchema = z.object({
    answers: z.array(
        z.object({
            taskId: z.string().readonly(),
            value: z.string().optional(),
            attemptValueId: z.string().optional(),
        }),
    ),
    attemptId: z.string().readonly(),
});
