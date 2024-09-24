import { Metadata } from 'next';

import { LoginPage } from '@/pages-layer/login';

export const metadata: Metadata = {
    title: 'Edu App | Вход в ЛК',
};

const Page = async ({}) => {
    return <LoginPage />;
};

export default Page;
