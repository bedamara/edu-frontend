import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';

export const ArrowIcon: FC<ComponentPropsWithoutRef<'svg'>> = ({
    className,
    ...props
}) => (
    <svg
        className={cn('size-2.5', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
        />
    </svg>
);
