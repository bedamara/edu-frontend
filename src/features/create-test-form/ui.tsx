'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO, isValid as isValidDate } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import {
    CompleteBeforeField,
    ExamThemeGroup,
    StudentsListForm,
} from '@/features/create-test-form/components';
import { getDefaultValues } from '@/features/create-test-form/helpers';
import { createTestFormClientSchema } from '@/features/create-test-form/schema';
import { createTestServerAction } from '@/features/create-test-form/server-action';
import { isTeacherRole } from '@/shared/helpers';
import { useTasks, useTheoryThemes } from '@/shared/hooks';
import { HookFormProvider } from '@/shared/lib/hook-form';
import { useProfileStore } from '@/shared/providers';
import { createNewAttempt } from '@/shared/server-actions';
import { Button, Spinner } from '@/shared/ui';
import { ErrorMessage } from '@/shared/ui/form-error-message';

export const CreateTestForm: FC<ComponentPropsWithoutRef<'div'>> = () => {
    const router = useRouter();
    const [errorMessageText, setErrorMessageText] = useState('');
    const [isSubmittingEgeVariant, setIsSubmittingEgeVariant] = useState(false);
    const { orderedExamThemes, themes } = useTheoryThemes();
    const { tasksList } = useTasks();

    const classes = useProfileStore((store) => store.classes);

    const { data } = useSession();
    const isTeacher = isTeacherRole(data);

    const defaultValues = useMemo(
        () =>
            getDefaultValues(
                orderedExamThemes,
                themes,
                tasksList,
                isTeacher ? classes : [],
            ),
        [orderedExamThemes, themes, tasksList, isTeacher],
    );

    const form = useForm({
        resolver: zodResolver(
            createTestFormClientSchema,
            {},
            {
                mode: 'sync',
            },
        ),
        criteriaMode: 'firstError',
        delayError: 500,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues,
    });
    const {
        formState: { isSubmitting, isValid, isValidating },
        getValues,
        control,
    } = form;
    const { fields } = useFieldArray({
        control,
        name: 'tasks',
    });

    const showMessage = (text: string) => {
        setErrorMessageText(text);
        setTimeout(() => {
            setErrorMessageText('');
        }, 5000);
    };

    const onSubmit = async (
        data: z.infer<typeof createTestFormClientSchema>,
    ) => {
        try {
            const filteredTasks = data.tasks
                .filter((item) => item.tasksCount !== 0)
                .map((item) => ({
                    tasksCount: item.tasksCount,
                    themes: item.themes
                        .filter((theme) => theme.enabled)
                        .map((theme) => theme.themeId),
                }));

            const filteredStudents = data.students
                .filter((item) => item.enabled)
                .map((item) => item.studentId);

            if (filteredTasks.length === 0) {
                showMessage('В тесте должно быть не менее 1 задания');
                return;
            }

            if (isTeacher && filteredStudents.length === 0) {
                showMessage(
                    'Тест возможно создать как минимум для одного ученика',
                );
                return;
            }

            const completeBeforeDate = new Date(data.completeBefore || '');

            const result = await createTestServerAction({
                tasks: filteredTasks,
                students: filteredStudents,
                completeBefore: isValidDate(completeBeforeDate)
                    ? formatISO(completeBeforeDate)
                    : null,
            });

            if (result) {
                if (isTeacher) {
                    router.push(`/profile/test/${result.slug}/`);
                    return;
                }
                const newAttempt = await createNewAttempt({
                    testSlug: result.slug || '',
                });
                router.push(
                    `/profile/test/${result.slug}/?attempt=${newAttempt?.slug}`,
                );
            } else {
                showMessage('Произошла ошибка. Попробуйте ещё раз');
            }
        } catch (error) {
            console.error(error);
            showMessage('Произошла ошибка. Попробуйте ещё раз');
        }
    };

    const onCreateEgeVariant = async () => {
        try {
            const data = getValues();
            setIsSubmittingEgeVariant(true);
            const allTasks = data.tasks.map((item) => ({
                tasksCount: 1,
                themes: item.themes.map((theme) => theme.themeId),
            }));

            const filteredStudents = data.students
                .filter((item) => item.enabled)
                .map((item) => item.studentId);

            if (allTasks.length === 0) {
                showMessage('В тесте должно быть не менее 1 задания');
                setIsSubmittingEgeVariant(false);
                return;
            }

            if (isTeacher && filteredStudents.length === 0) {
                showMessage(
                    'Тест возможно создать как минимум для одного ученика',
                );
                setIsSubmittingEgeVariant(false);
                return;
            }

            const completeBeforeDate = new Date(data.completeBefore || '');

            const result = await createTestServerAction({
                tasks: allTasks,
                students: filteredStudents,
                completeBefore: isValidDate(completeBeforeDate)
                    ? formatISO(completeBeforeDate)
                    : null,
            });
            if (result) {
                if (isTeacher) {
                    router.push(`/profile/test/${result.slug}/`);
                    return;
                }
                const newAttempt = await createNewAttempt({
                    testSlug: result.slug || '',
                });
                router.push(
                    `/profile/test/${result.slug}/?attempt=${newAttempt?.slug}`,
                );
            } else {
                showMessage('Произошла ошибка. Попробуйте ещё раз');
            }
            setIsSubmittingEgeVariant(false);
        } catch (error) {
            console.error(error);
            showMessage('Произошла ошибка. Попробуйте ещё раз');
            setIsSubmittingEgeVariant(false);
        }
    };

    const isDisabledButton =
        isSubmitting ||
        isSubmittingEgeVariant ||
        isValidating ||
        !isValid ||
        !!errorMessageText;

    return (
        <HookFormProvider {...form}>
            {errorMessageText && (
                <ErrorMessage
                    className="fixed z-20 mx-4 h-16 w-11/12 max-w-2xl gap-8 to-25% p-8 text-base shadow-2xl md:w-full"
                    showMessage={!!errorMessageText}>
                    {errorMessageText}
                </ErrorMessage>
            )}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col items-start gap-8">
                <Button
                    type="button"
                    disabled={isSubmittingEgeVariant || isDisabledButton}
                    onClick={() => onCreateEgeVariant()}
                    className="flex h-20 w-full cursor-pointer items-center justify-center">
                    {isSubmittingEgeVariant ? (
                        <Spinner className="size-7" />
                    ) : (
                        <>Создать тренировочный вариант ЕГЭ</>
                    )}
                </Button>
                {isTeacher && (
                    <div className="flex w-full flex-col gap-8 md:hidden">
                        <StudentsListForm control={control} />
                        <CompleteBeforeField control={control} />
                    </div>
                )}
                <p className="block w-full text-center text-xl font-semibold md:text-4xl">
                    Конструктор теста
                </p>
                <div className="relative flex w-full items-start justify-between gap-8 mobile:flex-col">
                    <div className="flex flex-col gap-8 md:gap-4">
                        {fields.map((field, index) => {
                            return (
                                <ExamThemeGroup
                                    key={field.id}
                                    {...{ control, index }}
                                />
                            );
                        })}
                    </div>
                    <div className="sticky z-10 flex w-full flex-col gap-4 md:top-32 md:w-1/3 mobile:bottom-0 mobile:rounded-md mobile:bg-slate-100 mobile:p-4 mobile:shadow-2xl">
                        {isTeacher && (
                            <div className="flex w-full flex-col gap-4 mobile:hidden">
                                <StudentsListForm control={control} />
                                <CompleteBeforeField control={control} />
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="flex h-11 w-full items-center justify-center"
                            disabled={isDisabledButton}>
                            {isSubmitting ? (
                                <Spinner className="size-7" />
                            ) : (
                                <span>Создать тест</span>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </HookFormProvider>
    );
};
