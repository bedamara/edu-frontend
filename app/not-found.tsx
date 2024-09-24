import { Metadata } from 'next';

import { NotFoundPage } from '@/pages-layer/not-found';

export const metadata: Metadata = {
    title: 'Edu App | Страница не найдена',
};

const Page = async ({}) => {
    return <NotFoundPage />;
};

export default Page;
