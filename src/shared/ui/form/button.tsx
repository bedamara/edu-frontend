import Link from 'next/link';
import { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '@/shared/lib/tw-merge';

type ButtonProps = ComponentPropsWithRef<'button'> & {
    variant?: 'text' | 'button';
};
type LinkProps = ComponentPropsWithRef<'a'> & { variant: 'link'; href: string };

type Props = ButtonProps | LinkProps;

const commonClasses = cn(
    'flex items-center justify-center rounded-lg bg-slate-500 px-4 py-2 font-bold text-white transition-colors duration-300',
);

const linkClasses = cn('text-center hover:bg-slate-700');

const btnClasses = cn('enabled:hover:bg-slate-700 disabled:opacity-75');

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    if (props.variant === 'link') {
        const {
            children,
            className,
            href,
            variant: _,
            ...rest
        } = props as LinkProps;

        return (
            <Link
                href={href}
                className={cn(commonClasses, linkClasses, className)}
                {...rest}>
                {children}
            </Link>
        );
    }

    const {
        children,
        className,
        variant = 'button',
        type = 'button',
        ...rest
    } = props as ButtonProps;

    return (
        <button
            ref={ref}
            className={cn(
                ...(variant === 'button' ? [commonClasses, btnClasses] : []),
                className,
            )}
            type={type}
            {...rest}>
            {children}
        </button>
    );
});

Button.displayName = 'Button';
