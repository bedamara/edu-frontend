'use client';
import * as React from 'react';
import { forwardRef, HTMLAttributes, useId } from 'react';
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
} from 'react-hook-form';

import { cn } from '@/shared/lib/tw-merge';
import { Slot } from '@/shared/ui/slot';

import { FormFieldContext, FormItemContext } from './context';
import { useFormField } from './hooks';

export const HookFormProvider = FormProvider;

export const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

export const FormItem = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                ref={ref}
                className={cn('flex min-h-24 w-full flex-col gap-1', className)}
                {...props}
            />
        </FormItemContext.Provider>
    );
});
FormItem.displayName = 'FormItem';

export const FormLabel = forwardRef<
    React.ElementRef<'label'>,
    React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
        <label
            ref={ref}
            className={cn('block w-full text-sm font-medium', className)}
            htmlFor={formItemId}
            {...props}
        />
    );
});
FormLabel.displayName = 'FormLabel';

export const FormControl = forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const {
        fieldState: { error },
        formItemId,
        formDescriptionId,
        formMessageId,
    } = useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = 'FormControl';

export const FormDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p ref={ref} id={formDescriptionId} className={className} {...props} />
    );
});
FormDescription.displayName = 'FormDescription';

export const FormMessage = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const {
        fieldState: { error },
        formMessageId,
    } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
        return null;
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn('block w-full text-xs text-red-700', className)}
            {...props}>
            {body}
        </p>
    );
});
FormMessage.displayName = 'FormMessage';
