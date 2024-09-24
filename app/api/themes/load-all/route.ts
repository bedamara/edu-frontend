import { loadThemesData } from '@/shared/api/cms-service/themes';
import { auth } from '@/shared/lib/next-auth';

// export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request) {
    const session = await auth();
    const token = session && session.token;

    if (!token) {
        return Response.json({ data: null }, { status: 403 });
    }

    try {
        const data = await loadThemesData(token);
        return Response.json({ data }, { status: 200 });
    } catch (e) {
        console.log('Error loading themes', e);
        return Response.json({ data: null }, { status: 200 });
    }
}
