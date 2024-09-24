import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';

type Props = ComponentPropsWithoutRef<'div'> & {
    isTeacherTests?: boolean;
    showTasksCount?: boolean;
};

export const TestListHeader: FC<Props> = (props) => {
    const { isTeacherTests, showTasksCount } = props;
    return (
        <div
            className={cn(
                'grid grid-cols-24 grid-rows-1 gap-2 border-b-2 border-gray-200 px-4 pb-4 text-xs mobile:hidden',
                props.className,
            )}>
            <div className="hidden items-center justify-center text-center md:flex">
                № теста
            </div>
            <div className="col-span-2 flex items-center justify-center text-center md:col-span-7">
                Автор теста
            </div>
            <div className="flex items-center justify-center text-center md:col-span-2">
                Дата создания
            </div>
            {showTasksCount && !isTeacherTests ? (
                <div className="flex items-center justify-center text-center md:col-span-5">
                    Кол-во задач
                </div>
            ) : (
                <div className="flex items-center justify-center text-center md:col-span-5">
                    Пройти до
                </div>
            )}

            {isTeacherTests ? (
                <>
                    <div className="flex items-center justify-center text-center md:col-span-3">
                        Кол-во задач
                    </div>
                    <div className="flex items-center justify-center text-center md:col-span-2">
                        Кол-во учеников
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center text-center md:col-span-3">
                        Пройдено за
                    </div>
                    <div className="flex items-center justify-center text-center md:col-span-2">
                        Правильных ответов
                    </div>
                </>
            )}
        </div>
    );
};
