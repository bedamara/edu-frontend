import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';

type Props = ComponentPropsWithoutRef<'div'>;
export const PageContainer: FC<Props> = ({ children, className }) => {
    return (
        <div className={cn('min-h-screen w-full bg-slate-200', className)}>
            {children}
        </div>
    );
};
