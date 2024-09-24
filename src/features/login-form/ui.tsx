'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentPropsWithoutRef, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { signInServerAction } from '@/features/login-form/server-action';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    HookFormProvider,
} from '@/shared/lib/hook-form';
import { Button, Input, Spinner } from '@/shared/ui';
import { ErrorMessage } from '@/shared/ui/form-error-message';

import { loginFormSchema } from './schema';

export const LoginForm: FC<ComponentPropsWithoutRef<'div'>> = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const showMessage = () => {
        setShowErrorMessage(true);
        setTimeout(() => {
            setShowErrorMessage(false);
        }, 3000);
    };

    const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
        try {
            const result = await signInServerAction(data);
            if (result) {
                location.reload();
            } else {
                showMessage();
            }
        } catch (error) {
            console.error(error);
            showMessage();
        }
    };

    const {
        formState: { isSubmitting, isDirty, isValid },
    } = form;

    const isDisabledButton =
        isSubmitting || !isDirty || !isValid || showErrorMessage;

    const isDisabledFields = isSubmitting;

    return (
        <div className="relative flex w-full max-w-3xl justify-center rounded-md bg-slate-50 p-4 text-black md:px-8 md:py-12">
            <HookFormProvider {...form}>
                <ErrorMessage
                    showMessage={showErrorMessage}
                    className="absolute -top-16 left-0 h-12 w-full">
                    Неверная почта или пароль
                </ErrorMessage>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full max-w-md flex-col items-center gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="off"
                                        disabled={isDisabledFields}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        tabIndex={2}
                                        autoComplete="off"
                                        type="password"
                                        disabled={isDisabledFields}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="flex h-11 w-full items-center justify-center"
                        disabled={isDisabledButton}>
                        {isSubmitting ? (
                            <Spinner className="size-7" />
                        ) : (
                            <span>Войти</span>
                        )}
                    </Button>
                </form>
            </HookFormProvider>
        </div>
    );
};
