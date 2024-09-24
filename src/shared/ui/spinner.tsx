import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';

export const Spinner: FC<ComponentPropsWithoutRef<'div'>> = ({ className }) => (
    <div
        className={cn(
            'block size-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
            className,
        )}
        role="status"
    />
);
