import { Metadata } from 'next';

import { ShowTestPage } from '@/pages-layer/show-test';

export const metadata: Metadata = {
    title: 'Edu App | Тест',
};

const Page = ({ params }: { params: { slug: string } }) => {
    return <ShowTestPage slug={params.slug} />;
};

export default Page;
