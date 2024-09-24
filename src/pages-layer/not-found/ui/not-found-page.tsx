import Link from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';

import { AuthLayout } from '@/widgets';

export const NotFoundPage: FC<ComponentPropsWithoutRef<'div'>> = async () => {
    return (
        <AuthLayout>
            <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-4xl">Ошибка 404</span>
                    <span className="text-xl">Страница не найдена</span>
                </div>
                <Link
                    href="/"
                    replace
                    className="block rounded-md bg-white px-4 py-2 text-gray-700">
                    Перейти на главную
                </Link>
            </div>
        </AuthLayout>
    );
};
