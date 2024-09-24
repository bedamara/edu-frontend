'use client';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react';

import { Enum_Orderedtasktheme_Blockcolor } from '@/shared/api/cms-service/graphql/types';
import { useTheoryThemes } from '@/shared/hooks';
import { cn } from '@/shared/lib/tw-merge';
import { OrderedExamTheme } from '@/shared/types';
import { FullPageLoader } from '@/shared/ui';

const COLORS: Record<
    Enum_Orderedtasktheme_Blockcolor,
    { default: string; hovered: string; description: string }
> = {
    GREEN: {
        default: 'bg-indigo-900',
        hovered: 'hover:bg-indigo-950',
        description: 'Информационные модели',
    },
    TEAL: {
        hovered: 'hover:bg-blue-950',
        default: 'bg-blue-900',
        description: 'Информация и её кодирование',
    },
    CYAN: {
        hovered: 'hover:bg-gray-900',
        default: 'bg-gray-600',
        description: 'Логика',
    },
    BROWN: {
        hovered: 'hover:bg-cyan-900',
        default: 'bg-cyan-600',
        description: 'Алгоритмизация',
    },
    BLACK: {
        hovered: 'hover:bg-cyan-950',
        default: 'bg-cyan-800',
        description: 'Программирование',
    },
};

const OrderedExamThemeBlock: FC<
    ComponentPropsWithoutRef<'div'> & { theme: OrderedExamTheme }
> = (props) => {
    const { theme: examTheme, className } = props;
    const { getAllExamTaskThemesById } = useTheoryThemes();

    const taskThemes = getAllExamTaskThemesById(examTheme.id);

    return (
        <Link
            className={cn('block', className)}
            href={`/profile/theory/${examTheme.slug}`}>
            <div
                className={cn(
                    'flex h-full cursor-pointer flex-col gap-2 rounded-md p-4 text-white opacity-80 transition-colors duration-300',
                    COLORS[examTheme.BlockColor || 'BLACK'].default,
                    COLORS[examTheme.BlockColor || 'BLACK'].hovered,
                )}>
                <p className="flex items-start justify-start gap-2 text-sm font-semibold">
                    <span>{examTheme.ExamPosition}.</span>
                    <span>{examTheme.Title}</span>
                </p>
                <ul className="flex list-disc flex-col gap-2 pl-4 italic">
                    {taskThemes.map((theme) => (
                        <li key={theme.slug} className="text-xs">
                            {theme.Title}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
};

export const TheoryMainPage: FC = () => {
    const { loadAllThemes, isLoading, orderedExamThemes } = useTheoryThemes();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadAllThemes();
    }, []);

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex flex-col items-center gap-8 py-10 md:gap-10">
            <p className="text-xl font-semibold md:text-4xl">
                Теоретические материалы
            </p>
            <div className="grid gap-4 md:grid-cols-5">
                {Object.entries(COLORS).map(([key, item]) => (
                    <div
                        key={key}
                        onClick={() =>
                            setFilter((prev) => (prev !== key ? key : ''))
                        }
                        className={cn(
                            'flex cursor-pointer items-center justify-center rounded-md border-4 border-transparent p-4 opacity-80',
                            item.default,
                            item.hovered,
                            filter === key && 'border-slate-900 shadow-2xl',
                        )}>
                        <span className="text-center text-base text-white">
                            {item.description}
                        </span>
                    </div>
                ))}
            </div>
            <hr className="mx-auto h-1 w-3/4 bg-slate-300" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {orderedExamThemes
                    .filter((item) => !filter || filter === item.BlockColor)
                    .map((item) => {
                        return (
                            <OrderedExamThemeBlock
                                key={item.slug}
                                theme={item}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
