'use client';
import { useSession } from 'next-auth/react';
import {
    ChangeEvent,
    ChangeEventHandler,
    ComponentPropsWithoutRef,
    FC,
    useCallback,
    useMemo,
    useState,
} from 'react';
import {
    Control,
    useFieldArray,
    useFormContext,
    useWatch,
} from 'react-hook-form';

import { FormValues } from '@/features/create-test-form/types';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/shared/lib/hook-form';
import { cn } from '@/shared/lib/tw-merge';
import { useProfileStore } from '@/shared/providers';
import { Checkbox, Input } from '@/shared/ui';

type CompleteBeforeFieldProps = {
    control: Control<FormValues>;
    className?: string;
};

export const CompleteBeforeField: FC<CompleteBeforeFieldProps> = (props) => {
    const { control, className } = props;

    return (
        <div className={cn(className)}>
            <FormField
                control={control}
                name="completeBefore"
                render={({ field }) => (
                    <FormItem className="min-h-0 w-fit">
                        <FormLabel>Выполнить до:</FormLabel>
                        <FormControl>
                            <Input
                                type="datetime-local"
                                autoComplete="off"
                                {...field}
                                value={field.value || ''}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
};

type StudentFieldProps = {
    control: Control<FormValues>;
    index: number;
    onChange?: () => void;
};

const StudentField: FC<StudentFieldProps> = (props) => {
    const { control, index, onChange } = props;
    const { setValue } = useFormContext();
    const fieldData = useWatch({
        control,
        name: `students.${index}`,
    });

    const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(`students.${index}.enabled`, event.target.value, {
            shouldValidate: false,
        });
        onChange && onChange();
    };

    const { name } = fieldData;

    return (
        <FormField
            control={control}
            name={`students.${index}.enabled`}
            render={({ field }) => (
                <FormItem className="min-h-0 w-fit">
                    <FormControl>
                        <Checkbox
                            {...field}
                            onChange={onChangeValue}
                            label={name}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

const CheckedStudsCount: FC<Props> = (props) => {
    const { className, control } = props;
    const fieldData = useWatch({
        control,
        name: `students`,
    });

    return (
        <span className={className}>
            {fieldData.filter((item) => item.enabled).length}
        </span>
    );
};

type Props = ComponentPropsWithoutRef<'div'> & {
    control: Control<FormValues>;
};

export const StudentsListForm: FC<Props> = (props) => {
    const { control, className } = props;
    const { data } = useSession();
    const classes = useProfileStore((store) => store.classes);
    const { fields } = useFieldArray({
        control,
        name: 'students',
    });
    const { setValue } = useFormContext();
    const [searchString, setSearchString] = useState('');
    const [classChecks, setClassChecks] = useState<Record<string, boolean>>({});

    const fieldsWithIndex = useMemo(
        () => fields.map((field, index) => ({ field, index })),
        [fields],
    );

    const onClassChange = useCallback(
        (classId: string, event: ChangeEvent<HTMLInputElement>) => {
            const {
                target: { checked },
            } = event;
            const fieldsToUpdate = fieldsWithIndex.filter(
                ({ field }) => field.classId === classId,
            );

            fieldsToUpdate.forEach(({ index }) => {
                setValue(`students.${index}.enabled`, checked, {
                    shouldValidate: false,
                });
            });
            setClassChecks((prev) => ({
                ...prev,
                [classId]: checked,
            }));
            if (checked) {
                setSearchString('');
            }
        },
        [],
    );

    const onSearchInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setSearchString(event.target.value);
        },
        [],
    );

    const searchFilter = (studName: string) =>
        !searchString.trim() ||
        studName
            .trim()
            .toLowerCase()
            .includes(searchString.trim().toLowerCase());

    const clearClassCheck = useCallback(
        (classId: string) =>
            setClassChecks((prev) => ({
                ...prev,
                [classId]: false,
            })),
        [],
    );

    return (
        <div
            className={cn(
                'relative flex h-96 w-full flex-col gap-4 overflow-hidden rounded-md bg-slate-500 p-4 pb-12 text-white',
                className,
            )}>
            <span className="text-xl font-semibold">Кому назначить тест</span>
            <Input
                className="h-8 p-1 text-black"
                placeholder="Поиск по ФИО"
                value={searchString}
                disabled={false}
                onChange={onSearchInputChange}
            />
            <div className="flex h-full flex-col gap-4 overflow-y-scroll rounded border-b-2 border-slate-50 bg-slate-600 px-2 py-4 ">
                {classes
                    .filter((item) => item.Teacher.id === data?.user?.id)
                    .map((classItem) => {
                        return (
                            <div
                                key={classItem.id}
                                className="flex flex-col gap-2.5">
                                <Checkbox
                                    id={`class${classItem.id}`}
                                    value={
                                        classChecks[classItem.id || ''] || false
                                    }
                                    onChange={(e) =>
                                        onClassChange(classItem.id || '', e)
                                    }
                                    label={
                                        <p>
                                            {classItem.Name}
                                            <span className="pl-4 text-sm font-light">
                                                ({classItem.School.Name})
                                            </span>
                                        </p>
                                    }
                                />
                                <div className="ml-2 flex flex-col gap-1 border-l-2 border-slate-200 pl-4 text-sm">
                                    {fieldsWithIndex
                                        .filter(
                                            ({ field }) =>
                                                field.classId ===
                                                    classItem.id &&
                                                searchFilter(field.name),
                                        )
                                        .map(({ field, index }) => {
                                            return (
                                                <StudentField
                                                    key={field.id}
                                                    onChange={() =>
                                                        clearClassCheck(
                                                            field.classId,
                                                        )
                                                    }
                                                    {...{ control, index }}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="absolute bottom-0 left-0 p-4 pb-3">
                <p>
                    Выбрано: <CheckedStudsCount control={control} />
                </p>
            </div>
        </div>
    );
};
