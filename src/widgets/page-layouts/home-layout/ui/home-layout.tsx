import { ComponentPropsWithoutRef, FC } from 'react';

import { LogOut } from '@/features/logout';
import { Navbar, PageContainer, UserInfo } from '@/shared/ui';

type LayoutProps = ComponentPropsWithoutRef<'div'> & {
    showNavbar?: boolean;
};

export const HomeLayout: FC<LayoutProps> = async ({
    children,
    showNavbar = true,
}) => {
    return (
        <PageContainer>
            {showNavbar && (
                <Navbar
                    leftComponent={<UserInfo />}
                    rightComponent={<LogOut />}
                />
            )}
            <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-4 bg-slate-50 px-4 pt-20">
                {children}
            </div>
        </PageContainer>
    );
};
