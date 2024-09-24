'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC, useMemo } from 'react';

import { cn } from '@/shared/lib/tw-merge';

import DefaultImage from './assets/default-img.png';

type Props = ComponentPropsWithoutRef<'div'>;

export const UserInfo: FC<Props> = (props) => {
    const { className } = props;
    const { data } = useSession();
    const { user } = data || {};
    const userRole = user && user.role && user.role.name.toLowerCase();
    const pathname = usePathname();

    const userTypeText = useMemo(
        () => (userRole === 'student' ? 'ученик' : 'учитель'),
        [userRole],
    );

    if (!user) {
        return null;
    }

    return (
        <div className={cn('flex items-center justify-start gap-8', className)}>
            <Link className={cn('block w-fit')} href="/profile">
                <div
                    className={
                        'flex h-full w-fit items-center justify-start gap-4'
                    }>
                    <div>
                        <Image
                            src={DefaultImage}
                            width={40}
                            height={40}
                            alt="profile img"
                            className="rounded-full"
                            placeholder="blur"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="text-sm">
                            {user.email}{' '}
                            <span className="text-xs font-light opacity-50">
                                ({userTypeText})
                            </span>
                        </span>
                    </div>
                </div>
            </Link>
            <div className="hidden items-center justify-start gap-4 md:flex">
                <Link
                    className={cn(
                        'text-sm text-gray-500 hover:text-white',
                        pathname === '/profile/' && 'text-white',
                    )}
                    href="/profile/">
                    Главная
                </Link>
                <Link
                    className={cn(
                        'text-sm text-gray-500 hover:text-white',
                        pathname.includes('/profile/theory/') && 'text-white',
                    )}
                    href="/profile/theory/">
                    Теория
                </Link>
                <Link
                    className={cn(
                        'text-sm text-gray-500 hover:text-white',
                        pathname.includes('/profile/results/') && 'text-white',
                    )}
                    href="/profile/results/">
                    Результаты
                </Link>
                <Link
                    className={cn(
                        'text-sm text-gray-500 hover:text-white',
                        pathname.includes('/profile/statistics/') &&
                            'text-white',
                    )}
                    href="/profile/statistics/">
                    Статистика
                </Link>
            </div>
        </div>
    );
};
