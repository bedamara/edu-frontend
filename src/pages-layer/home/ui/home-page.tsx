'use client';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import { isTeacherRole } from '@/shared/helpers';
import { MainButtons, TestsList } from '@/widgets';

export const HomePage: FC<ComponentPropsWithoutRef<'div'>> = () => {
    const { data } = useSession();
    const isTeacher = isTeacherRole(data);

    return (
        <div className="-mt-20 flex flex-col gap-4 pb-4 pt-20 md:h-dvh">
            <MainButtons className="h-fit" />
            <TestsList
                title={isTeacher ? 'Созданные тесты' : 'Активные тесты'}
                onlyTeacherTests={isTeacher}
                filterByActivity="active"
                className="md:h-full md:overflow-hidden"
                showCreateBtnOnEmpty
            />
        </div>
    );
};
