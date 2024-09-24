import { NextResponse } from 'next/server';

import { auth as middleware } from '@/shared/lib/next-auth';

export default middleware((request) => {
    const {
        nextUrl: { pathname },
        auth: session,
    } = request;

    if (session) {
        if (pathname.includes('/login')) {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    } else {
        if (pathname.includes('/profile')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
