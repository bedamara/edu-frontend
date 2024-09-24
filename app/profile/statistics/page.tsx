import { Metadata } from 'next';

import { StatisticsPage } from '@/pages-layer/statistics';

export const metadata: Metadata = {
    title: 'Edu App | Статистика',
};

const Page = async ({}) => {
    return <StatisticsPage />;
};

export default Page;
