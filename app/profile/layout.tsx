import { getProfileData } from '@/shared/api/cms-service';
import { ProfileStoreProvider } from '@/shared/providers';
import { HomeLayout } from '@/widgets';

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const classes = (await getProfileData()) || [];

    return (
        <ProfileStoreProvider
            initialState={{
                classes,
            }}>
            <HomeLayout>{children}</HomeLayout>
        </ProfileStoreProvider>
    );
}
