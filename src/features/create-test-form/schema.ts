import * as z from 'zod';

export const createTestFormClientSchema = z.object({
    tasks: z.array(
        z
            .object({
                tasksCount: z.number().min(0),
                themes: z.array(
                    z.object({
                        enabled: z.boolean(),
                        themeId: z.string().readonly(),
                        tasksCount: z.number().min(0).readonly(),
                    }),
                ),
            })
            .superRefine((data, ctx) => {
                const maxAvailableTasksCount = data.themes.reduce(
                    (prev, currentTheme) => {
                        return (
                            prev +
                            (currentTheme.enabled ? currentTheme.tasksCount : 0)
                        );
                    },
                    0,
                );
                if (data.tasksCount > maxAvailableTasksCount) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `Доступное количество задач: ${maxAvailableTasksCount}`,
                        path: ['tasksCount'],
                    });
                }
            }),
    ),
    students: z.array(
        z.object({
            classId: z.string().readonly(),
            studentId: z.string().readonly(),
            name: z.string().readonly(),
            enabled: z.boolean(),
        }),
    ),
    completeBefore: z.string().nullable(),
});

export const createTestServerSchema = z.object({
    tasks: z.array(
        z.object({
            tasksCount: z.number().min(0),
            themes: z.array(z.string()),
        }),
    ),
    students: z.array(z.string()),
    completeBefore: z.string().nullable(),
});
