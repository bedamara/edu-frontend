'use client';
import {
    ComponentPropsWithRef,
    FC,
    forwardRef,
    useCallback,
    useState,
} from 'react';
import * as React from 'react';

import { cn } from '@/shared/lib/tw-merge';

type Props = ComponentPropsWithRef<'input'>;

const ShowPasswordButton: FC<{ onToggle: () => void; toggledType: string }> = ({
    onToggle,
    toggledType,
}) => {
    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
                type="button"
                className="p-1 text-slate-500 focus:border-transparent focus:outline-none"
                onClick={onToggle}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    {toggledType === 'password' && (
                        <>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </>
                    )}

                    {toggledType === 'text' && (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    )}
                </svg>
            </button>
        </div>
    );
};

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ className, type, ...props }, ref) => {
        const [toggledType, setToggledType] = useState('password');
        const isPasswordField = type === 'password';

        const toggleType = useCallback(() => {
            setToggledType((prev) =>
                prev === 'password' ? 'text' : 'password',
            );
        }, []);

        return (
            <div className="relative inline-block">
                <input
                    ref={ref}
                    className={cn(
                        'block h-10 w-full rounded-md border border-slate-200 px-2 py-1 focus:outline-none disabled:opacity-75',
                        props['aria-invalid'] && 'border-red-700',
                        className,
                    )}
                    type={isPasswordField ? toggledType : type}
                    {...props}
                    onChange={
                        props.onChange && type === 'number'
                            ? (event) =>
                                  props.onChange &&
                                  props.onChange({
                                      ...event,
                                      target: {
                                          ...event.target,
                                          value: Number(
                                              event.target.value,
                                          ) as unknown as string,
                                      },
                                  })
                            : props.onChange
                    }
                />
                {isPasswordField && (
                    <ShowPasswordButton
                        onToggle={toggleType}
                        toggledType={toggledType}
                    />
                )}
            </div>
        );
    },
);
Input.displayName = 'Input';
