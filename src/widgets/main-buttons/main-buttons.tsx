'use client';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import { isTeacherRole } from '@/shared/helpers';
import { cn } from '@/shared/lib/tw-merge';
import { Button } from '@/shared/ui';

type Props = ComponentPropsWithoutRef<'button'>;

export const MainButtons: FC<Props> = ({ className }) => {
    const { data } = useSession();
    const isTeacher = isTeacherRole(data);
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2',
                className,
            )}>
            <Button
                className="h-16 md:col-span-2 md:col-start-3 md:row-start-1 md:h-24"
                variant="link"
                href="/profile/create-test/">
                Создать тестовый вариант
            </Button>
            <Button
                className="h-16 md:col-span-2 md:col-start-3  md:row-start-2 md:h-24"
                variant="link"
                href="/profile/results/">
                {isTeacher ? 'Результаты учеников' : 'Мои результаты'}
            </Button>
            <Button
                className="md:row-span-2"
                variant="link"
                href="/profile/theory/">
                Теоретические материалы
            </Button>
            <Button
                className="md:row-span-2"
                variant="link"
                href="/profile/statistics/">
                {isTeacher ? 'Статистика учеников' : 'Моя статистика'}
            </Button>
        </div>
    );
};
