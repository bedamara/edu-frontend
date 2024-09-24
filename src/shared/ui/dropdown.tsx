import { ComponentPropsWithoutRef, FC, MouseEventHandler } from 'react';

import { cn } from '@/shared/lib/tw-merge';

type Props = ComponentPropsWithoutRef<'div'> & {
    showDropdown: boolean;
    setShowDropdown: (value: boolean) => void;
};

export const Dropdown: FC<Props> = (props) => {
    const { children, className, showDropdown, setShowDropdown, ...other } =
        props;

    const onBlur: MouseEventHandler<HTMLDivElement> = (event) => {
        setShowDropdown(false);
    };

    return (
        <>
            <div
                className={cn(
                    'fixed left-0 top-0 z-10 hidden size-full',
                    showDropdown && 'block',
                )}
                onClick={onBlur}
            />
            <div
                className={cn(
                    'absolute z-20 hidden rounded-md bg-slate-600 p-4 text-white shadow-xl',
                    showDropdown && 'block',
                    className,
                )}>
                {children}
            </div>
        </>
    );
};
