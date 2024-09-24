import { ComponentPropsWithoutRef, FC } from 'react';

import { LoginForm } from '@/features/login-form';
import { AuthLayout } from '@/widgets';

export const LoginPage: FC<ComponentPropsWithoutRef<'div'>> = async () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
