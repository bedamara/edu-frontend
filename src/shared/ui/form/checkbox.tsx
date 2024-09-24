import { ComponentPropsWithoutRef, forwardRef } from 'react';
import * as React from 'react';

import { cn } from '@/shared/lib/tw-merge';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'value'> & {
    label?: string | React.ReactNode;
    value?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
    ({ className, label, value, ...props }, ref) => {
        return (
            <div className="flex items-center justify-start gap-2">
                <input
                    ref={ref}
                    checked={value}
                    type="checkbox"
                    className={cn(
                        'size-4 cursor-pointer  rounded border-gray-300 bg-gray-100 text-blue-600',
                        className,
                    )}
                    {...props}
                    onChange={(event) =>
                        props.onChange &&
                        props.onChange({
                            ...event,
                            target: {
                                ...event.target,
                                value: event.target
                                    .checked as unknown as string,
                            },
                        })
                    }
                />
                {label && (
                    <label
                        htmlFor={props.id}
                        className="w-full cursor-pointer text-sm font-medium">
                        {label}
                    </label>
                )}
            </div>
        );
    },
);

Checkbox.displayName = 'Checkbox';
