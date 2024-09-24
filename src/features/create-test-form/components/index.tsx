import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import {
    Control,
    useFieldArray,
    useFormContext,
    useWatch,
} from 'react-hook-form';

import { useDebounce } from '@/shared/hooks/debounce';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/shared/lib/hook-form';
import { Button, Checkbox, Dropdown, Input } from '@/shared/ui';
import { ArrowIcon } from '@/shared/ui/icons';

import { FormValues } from '../types';
export * from './teacher.form';

type TaskThemeProps = {
    examThemeIndex: number;
    control: Control<FormValues>;
    index: number;
    validateTasksCount: () => void;
};

const TaskThemeGroup: FC<TaskThemeProps> = (props) => {
    const { control, examThemeIndex, validateTasksCount, index } = props;
    const { setValue } = useFormContext();
    const fieldData = useWatch({
        control,
        name: `tasks.${examThemeIndex}.themes.${index}`,
    });

    const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(
            `tasks.${examThemeIndex}.themes.${index}.enabled`,
            event.target.value,
            { shouldValidate: false },
        );
        validateTasksCount();
    };

    const {
        theme: { Title },
        tasksCount,
    } = fieldData;

    return (
        <div className="flex items-center gap-2">
            <FormField
                control={control}
                name={`tasks.${examThemeIndex}.themes.${index}.enabled`}
                render={({ field }) => (
                    <FormItem className="min-h-0 w-fit">
                        <FormControl>
                            <Checkbox
                                {...field}
                                onChange={onChangeValue}
                                label={
                                    <p className="font-normal">
                                        {Title}
                                        {' - '}
                                        <span className="font-semibold">
                                            {tasksCount} шт.
                                        </span>
                                    </p>
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

type ExamThemeProps = {
    control: Control<FormValues>;
    index: number;
};

export const ExamThemeGroup: FC<ExamThemeProps> = (props) => {
    const { control, index: examIndex } = props;
    const { setValue, trigger } = useFormContext();
    const [showTaskthemes, setShowTaskthemes] = useState(false);

    const fieldData = useWatch({
        control,
        name: `tasks.${examIndex}`,
    });

    const { examTheme, tasksCount } = fieldData;

    const { fields } = useFieldArray({
        control,
        name: `tasks.${examIndex}.themes` as 'tasks.0.themes',
    });

    const debouncedValidate = useDebounce(() => {
        trigger(`tasks.${examIndex}.tasksCount`);
    }, 300);

    const onChangeTasksCount = useCallback(
        (action: 'add' | 'remove') => {
            const newValue =
                action === 'add' ? tasksCount + 1 : Math.max(tasksCount - 1, 0);

            setValue(`tasks.${examIndex}.tasksCount`, newValue, {
                shouldValidate: false,
            });
            debouncedValidate();
        },
        [debouncedValidate, tasksCount, examIndex, setValue],
    );

    const toggleThemes = () => {
        setShowTaskthemes((prevState) => !prevState);
    };

    return (
        <div className="flex flex-col-reverse justify-start gap-2 md:h-16 md:flex-row md:items-center">
            <div className="flex items-center justify-start gap-2 mobile:pl-4">
                <Button
                    variant="button"
                    className="mobile:size-6 mobile:p-4"
                    onClick={() => onChangeTasksCount('remove')}>
                    -
                </Button>
                <FormField
                    control={control}
                    name={`tasks.${examIndex}.tasksCount`}
                    render={({ field }) => (
                        <FormItem className="relative min-h-0 w-12">
                            <FormControl>
                                <Input
                                    disabled
                                    className="text-center mobile:h-9"
                                    min={0}
                                    autoComplete="off"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="absolute -bottom-6 z-10 w-52" />
                        </FormItem>
                    )}
                />
                <Button
                    variant="button"
                    className="mobile:size-6 mobile:p-4"
                    onClick={() => onChangeTasksCount('add')}>
                    +
                </Button>
            </div>
            <div className="flex items-start justify-between gap-4 md:items-center md:justify-start md:gap-2 mobile:w-full">
                <div className="flex items-start justify-start gap-2 text-sm md:w-80 md:items-center">
                    <span className="text-base font-semibold">
                        {examTheme.ExamPosition}.{' '}
                    </span>
                    <span>{examTheme.Title}</span>
                </div>
                <div className="relative mobile:pr-1">
                    <Button
                        className="flex w-fit rounded p-1.5"
                        onClick={toggleThemes}>
                        <ArrowIcon />
                    </Button>
                    <Dropdown
                        showDropdown={showTaskthemes}
                        setShowDropdown={setShowTaskthemes}
                        className="right-0 top-8 w-80">
                        <div className="flex flex-col gap-2">
                            {fields.map((field, index) => {
                                return (
                                    <TaskThemeGroup
                                        validateTasksCount={debouncedValidate}
                                        examThemeIndex={examIndex}
                                        key={field.id}
                                        {...{ control, index }}
                                    />
                                );
                            })}
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};
