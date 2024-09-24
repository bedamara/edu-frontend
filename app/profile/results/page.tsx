import { Metadata } from 'next';

import { ResultsPage } from '@/pages-layer/results';

export const metadata: Metadata = {
    title: 'Edu App | Список тестов',
};

const Page = async ({}) => {
    return <ResultsPage />;
};

export default Page;
