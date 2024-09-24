import { Metadata } from 'next';

import { HomePage } from '@/pages-layer/home';

export const metadata: Metadata = {
    title: 'Edu App | Личный кабинет',
};

const Page = async ({}) => {
    return <HomePage />;
};

export default Page;
