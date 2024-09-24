import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/shared/lib/next-auth';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const RootViewport: Viewport = {
    maximumScale: 1,
    initialScale: 1,
    userScalable: false,
    width: 'device-width',
};

export const RootMetadata: Metadata = {
    title: 'Edu App',
};

export const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth();

    const clientSession = session
        ? ({
              user: session.user,
              expires: session.expires,
          } as Session)
        : null;

    return (
        <SessionProvider session={clientSession}>
            <html lang="ru">
                <body className={inter.className}>{children}</body>
            </html>
        </SessionProvider>
    );
};
