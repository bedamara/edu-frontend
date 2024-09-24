import { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/tw-merge';
import { StudentAttemptInfo } from '@/shared/types/attempt';

export const CompleteBefore: FC<
    ComponentPropsWithoutRef<'div'> & {
        status: StudentAttemptInfo['Status'];
        before?: {
            date: string;
            timeLeft?: string;
        } | null;
    }
> = (props) => {
    const { status, before, className } = props;

    const { date, timeLeft } = before || {};
    return (
        <div
            className={cn(
                'flex flex-col items-start gap-1 md:items-center',
                className,
            )}>
            {!before ? (
                '-'
            ) : (
                <>
                    <span>{date}</span>
                    {!['completed', 'not_passed'].includes(status as string) &&
                    timeLeft ? (
                        <span className="text-xs">
                            осталось{' '}
                            <span className="font-bold">{timeLeft}</span>
                        </span>
                    ) : null}
                </>
            )}
        </div>
    );
};
