'use client';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import { isTeacherRole } from '@/shared/helpers';
import { useProfileStore } from '@/shared/providers';
import { SchoolClass } from '@/shared/types';
import { TestsList } from '@/widgets';

type Props = {
    classItem: SchoolClass;
    teacherId: string;
};
const ClassTestsList: FC<Props> = (props) => {
    const { classItem, teacherId } = props;
    const {
        Name,
        School: { Name: SchoolName },
        Students,
    } = classItem;
    return (
        <div className="flex flex-col gap-8">
            <p className="w-full text-center text-2xl font-semibold">
                Класс: {Name}{' '}
                <span className="text-xl font-light">({SchoolName})</span>
            </p>
            {Students.map((student) => {
                const studName = `${student.lastName}\u00A0${student.firstName[0].toUpperCase()}.`;
                return (
                    <div key={student.id} className="md:h-96">
                        <TestsList
                            userId={student.id || ''}
                            title={'Результаты ученика: ' + studName}
                            filterByActivity="notActive"
                            onlyTestsCreatedBy={teacherId}
                            className="rounded-md bg-slate-100 p-4 md:h-full md:overflow-hidden"
                            showTasksCount
                        />
                    </div>
                );
            })}
        </div>
    );
};

export const ResultsPage: FC<ComponentPropsWithoutRef<'div'>> = () => {
    const { data } = useSession();
    const classes = useProfileStore((store) => store.classes);
    const isTeacher = isTeacherRole(data);

    return (
        <div className="flex flex-col gap-12 pb-4">
            {isTeacher ? (
                <>
                    {classes.map((item) => (
                        <ClassTestsList
                            key={item.id}
                            classItem={item}
                            teacherId={data?.user?.id || ''}
                        />
                    ))}
                </>
            ) : (
                <TestsList
                    title="Мои результаты"
                    filterByActivity="notActive"
                    showCreateBtnOnEmpty
                    showTasksCount
                />
            )}
        </div>
    );
};
