import * as z from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Укажите валидный e-mail' }),
    password: z.string().min(8, { message: 'Минимум 8 символов' }),
});
