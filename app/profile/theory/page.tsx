import { Metadata } from 'next';

import { TheoryMainPage } from '@/pages-layer/theory-main';

export const metadata: Metadata = {
    title: 'Edu App | Теоретические материалы',
};

const Page = ({}) => {
    return <TheoryMainPage />;
};

export default Page;
