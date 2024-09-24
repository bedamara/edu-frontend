'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useMemo, useState } from 'react';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

import {
    completeAttemptServerAction,
    createOrUpdateAttemptValueServerAction,
} from '@/features/showing-test/server-actions';
import { wait } from '@/shared/helpers';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    HookFormProvider,
} from '@/shared/lib/hook-form';
import { cn } from '@/shared/lib/tw-merge';
import { ShowingTestData } from '@/shared/types';
import { StudentAttempt } from '@/shared/types/attempt';
import { Button, Input, Spinner } from '@/shared/ui';
import { Task } from '@/widgets';

import { getDefaultValues } from './helper';
import { answerTestFormClientSchema, FormValues } from './schema';

type Props = {
    openedTest: ShowingTestData;
    attempt?: StudentAttempt | null;
    watchMode?: boolean;
    isOpenedByTeacher?: boolean;
};

type CompleteResultsBlockProps = {
    control: Control<FormValues>;
};

const CompleteResultsBlock: FC<CompleteResultsBlockProps> = (props) => {
    const { control } = props;
    const fieldData = useWatch({
        control,
        name: `answers`,
    });

    return (
        <div className="w-full md:px-24">
            <div className="flex w-full items-center justify-center rounded-xl bg-slate-600 p-8 text-white">
                <p className="text-xl font-normal">
                    <span className="text-2xl font-semibold">
                        {fieldData.filter((item) => item.isCorrect).length}
                    </span>{' '}
                    из{' '}
                    <span className="text-2xl font-semibold">
                        {fieldData.length}
                    </span>{' '}
                    правильно
                </p>
            </div>
        </div>
    );
};

export const ShowingTest: FC<Props> = (props) => {
    const {
        openedTest: { tasks, test },
        watchMode = false,
        attempt,
        isOpenedByTeacher,
    } = props;

    const [isTestCompleted, setIsTestCompleted] = useState(
        watchMode && !!attempt,
    );

    const defaultValues = useMemo(
        () => getDefaultValues(tasks, attempt),
        [tasks, attempt],
    );

    const form = useForm({
        resolver: zodResolver(
            answerTestFormClientSchema,
            {},
            {
                mode: 'sync',
            },
        ),
        disabled: isTestCompleted,
        criteriaMode: 'firstError',
        delayError: 500,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues,
    });

    const {
        formState: { isSubmitting },
        control,
        setValue,
        getValues,
    } = form;

    const { fields } = useFieldArray({
        control,
        name: 'answers',
    });

    const fieldsWithIndex = useMemo(
        () => fields.map((field, index) => ({ field, index })),
        [fields],
    );

    const fieldsWatchedData = useWatch({
        control,
        name: `answers`,
    });

    const onSubmit = async (
        data: z.infer<typeof answerTestFormClientSchema>,
    ) => {
        try {
            await wait(1500);
            const answers = getValues(`answers`);
            const result = await completeAttemptServerAction({
                answers,

                attemptId: attempt?.id,
            });

            if (!result) {
                return;
            }
            fieldsWithIndex.forEach(({ field, index }) => {
                const resFieldData = result.find(
                    (item) => item.taskId === field.taskId,
                );

                const watchedData = fieldsWatchedData.find(
                    (item) => item.taskId === field.taskId,
                );

                setValue(
                    `answers.${index}.isCorrect`,
                    Boolean(resFieldData?.isCorrect),
                    {
                        shouldValidate: false,
                    },
                );
                if (!watchedData?.value && !resFieldData?.isCorrect) {
                    setValue(`answers.${index}.value`, 'Нет ответа', {
                        shouldValidate: false,
                    });
                }
            });
            setIsTestCompleted(true);
            window.scroll({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error(error);
        }
    };

    const onBlurField = async (
        taskId: string,
        index: number,
        event: React.FocusEvent<HTMLInputElement>,
        callback: (event: React.FocusEvent<HTMLInputElement>) => void,
    ) => {
        event.preventDefault();
        callback(event);
        const prevTaskValue = getValues(`answers.${index}`);
        if (attempt && prevTaskValue.value) {
            const result = await createOrUpdateAttemptValueServerAction({
                taskId,
                value: String(event.target.value),
                attemptId: String(attempt?.id),
                ...(prevTaskValue
                    ? { id: prevTaskValue.attemptValueId || '' }
                    : {}),
            });

            if (result) {
                setValue(`answers.${index}.attemptValueId`, result.id || '', {
                    shouldValidate: false,
                });
            }
        }
    };

    const isOpenedTeacherTest = isOpenedByTeacher && !attempt;
    const showSubmitBtn = !watchMode && !isTestCompleted;

    return (
        <div className="flex flex-col items-center gap-8 pb-10 md:gap-10 md:py-10">
            <p className="text-center text-xl font-semibold md:text-4xl">
                Тест № {test.id}
            </p>
            {isTestCompleted && <CompleteResultsBlock control={control} />}
            <HookFormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="relative flex w-full flex-col items-center gap-8 md:px-4">
                    {fields.map((field, index) => {
                        const watchedField = fieldsWatchedData.find(
                            (item) => item.taskId === field.taskId,
                        );
                        const task = tasks.find(
                            (item) => item.id === field.taskId,
                        );
                        if (!task) {
                            return null;
                        }
                        const isCorrectSet =
                            watchedField &&
                            typeof watchedField.isCorrect === 'boolean';
                        const isCorrectAnswer =
                            watchedField && watchedField.isCorrect;
                        return (
                            <div key={field.id} className="flex flex-col gap-4">
                                <Task
                                    index={index + 1}
                                    taskData={task}
                                    answerField={
                                        !isOpenedTeacherTest && (
                                            <FormField
                                                control={control}
                                                name={`answers.${index}.value`}
                                                render={({ field }) => (
                                                    <FormItem className="relative h-fit min-h-0 max-w-96">
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="off"
                                                                {...field}
                                                                onBlur={(
                                                                    event,
                                                                ) =>
                                                                    onBlurField(
                                                                        task?.id ||
                                                                            '',
                                                                        index,
                                                                        event,
                                                                        field.onBlur,
                                                                    )
                                                                }
                                                                className={cn(
                                                                    isCorrectSet &&
                                                                        (isCorrectAnswer
                                                                            ? 'border-2 border-green-400 bg-green-100'
                                                                            : 'border-2 border-red-400 bg-red-100'),
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="absolute -bottom-6 z-10 w-52" />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    }
                                />
                                {index !== tasks.length - 1 && (
                                    <div className="mx-auto mt-4 h-0.5 w-3/4 bg-gray-400" />
                                )}
                            </div>
                        );
                    })}
                    {showSubmitBtn && (
                        <div className="bottom-0 left-0 z-10 h-20 w-full rounded-md bg-slate-50 px-2 py-4 md:px-20 mobile:sticky">
                            <Button type="submit" className="w-full md:h-12">
                                {isSubmitting ? (
                                    <Spinner className="size-7" />
                                ) : (
                                    <span>Отправить решение</span>
                                )}
                            </Button>
                        </div>
                    )}
                </form>
            </HookFormProvider>
        </div>
    );
};
