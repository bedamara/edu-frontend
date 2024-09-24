import { Metadata } from 'next';

import { TheoryThemePage } from '@/pages-layer/theory-theme';

export const metadata: Metadata = {
    title: 'Edu App | Теоретические материалы',
};

const Page = ({ params }: { params: { slug: string } }) => {
    return <TheoryThemePage slug={params.slug} />;
};

export default Page;
