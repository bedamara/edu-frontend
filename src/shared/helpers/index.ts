import { Session } from 'next-auth';

export const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const isTeacherRole = (data: Session | null) => {
    const { user } = data || {};
    return user?.role?.name.toLowerCase() === 'teacher';
};
