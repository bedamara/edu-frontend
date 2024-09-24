'use client';

import { useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC, useState } from 'react';

import { signOutServerAction } from '@/features/logout/server-action';
import { cn } from '@/shared/lib/tw-merge';
import { Spinner } from '@/shared/ui';
import { Button } from '@/shared/ui/form';

type Props = ComponentPropsWithoutRef<'div'>;

export const LogOut: FC<Props> = (props) => {
    const { className } = props;
    const [inProcess, setInProcess] = useState(false);
    const { data } = useSession();
    const onClick = async () => {
        setInProcess(true);
        await signOutServerAction();
        location.reload();
    };

    if (!data) {
        return null;
    }

    return (
        <div className={cn('flex w-fit items-center justify-start', className)}>
            <Button variant="text" onClick={onClick} disabled={inProcess}>
                {inProcess ? <Spinner className="size-5 border-2" /> : 'Выйти'}
            </Button>
        </div>
    );
};
