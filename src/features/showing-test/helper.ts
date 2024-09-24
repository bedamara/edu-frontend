import * as z from 'zod';

import { answerTestFormClientSchema } from '@/features/showing-test/schema';
import { Task } from '@/shared/types';
import { StudentAttempt } from '@/shared/types/attempt';

export const getDefaultValues = (
    tasks: Task[],
    attempt?: StudentAttempt | null,
): z.infer<typeof answerTestFormClientSchema> => {
    const attemptValues = attempt?.Values || [];
    return {
        answers: tasks
            .sort((a, b) => (a.examPosition || 0) - (b.examPosition || 0))
            .map((task) => {
                const attemptValue = attemptValues.find(
                    (item) => item.Task === task.id,
                );
                return {
                    taskId: task.id || '',
                    ...(attemptValue
                        ? {
                              value: attemptValue.Value || '',
                              attemptValueId: attemptValue.id || '',
                              isCorrect:
                                  attempt?.Status === 'completed'
                                      ? Boolean(attemptValue.IsCorrect)
                                      : attemptValue.IsCorrect,
                          }
                        : attempt?.Status === 'completed'
                          ? {
                                value: 'Нет ответа',
                                attemptValueId: undefined,
                                isCorrect: false,
                            }
                          : {
                                value: '',
                                attemptValueId: undefined,
                                isCorrect: null,
                            }),
                };
            }),
    };
};
