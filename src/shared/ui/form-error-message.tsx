import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';

export const ErrorMessage: FC<
    ComponentPropsWithoutRef<'div'> & { showMessage: boolean }
> = ({ className, showMessage, children }) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center gap-2 rounded-md bg-red-300 text-sm opacity-0 transition-opacity duration-300',
                showMessage && 'opacity-100',
                className,
            )}>
            <svg
                className="size-5 fill-current text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
            <span className="text-gray-700">{children}</span>
        </div>
    );
};
