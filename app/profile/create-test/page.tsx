import { Metadata } from 'next';

import { CreateTestPage } from '@/pages-layer/create-test';

export const metadata: Metadata = {
    title: 'Edu App | Создание теста',
};

const Page = async ({}) => {
    return <CreateTestPage />;
};

export default Page;
