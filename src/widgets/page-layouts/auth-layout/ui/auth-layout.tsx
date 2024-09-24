import { ComponentPropsWithoutRef, FC } from 'react';

import { PageContainer } from '@/shared/ui';

type LayoutProps = ComponentPropsWithoutRef<'div'>;

export const AuthLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <PageContainer className="bg-slate-700 text-white">
            <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-4 overflow-hidden px-4">
                {children}
            </div>
        </PageContainer>
    );
};
