import { z } from 'zod';
import type { AccountType, ValidationErrors } from '@/types';

export const signUpSchema = z.object({
    firstName: z.string().min(2, 'First name should have at least 2 characters'),
    lastName: z.string().min(2, 'Last name should have at least 2 characters'),
    email: z.string().email('The email is not valid.'),
    username: z.string().min(5, 'Username should have at least 5 characters'),
    phoneNumber: z.string()
        .min(10, 'Phone number should have at least 10 characters')
        .refine((value) => /[+0-9]/.test(value), 'Phone number should have only numbers'),
    password: z.string()
        .min(8, 'Password should have at least 8 characters')
        .refine((value) => /[a-z]/.test(value), 'Password should have at least one lowercase letter')
        .refine((value) => /[A-Z]/.test(value), 'Password should have at least one uppercase letter')
        .refine((value) => /[0-9]/.test(value), 'Password should have at least one number')
        .refine((value) => /[^a-zA-Z0-9]/.test(value), 'Password should have at least one special character'),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'The passwords does not match',
            path: ['confirmPassword']
        });
    }
});

export type SignUpPayload = z.infer<typeof signUpSchema>;

export type SignUpErrors = ValidationErrors<SignUpPayload>;

export const signInSchema = z.object({
    email: z.string().email('This is not a valid email'),
    password: z.string(),
});

export type SignInPayload = z.infer<typeof signInSchema>;

export type GoogleAuthPayload = {
    accessToken: string,
    accountType?: AccountType
};

export const recoveryCodeVerificationSchema = z.object({
    email: z.string().email(),
    code: z.string(),
});

export type RecoveryCodeVerificationPayload = z.infer<typeof recoveryCodeVerificationSchema>;

export const passwordResetSchema = z.object({
    email: z.string().email(),
    code: z.string(),
    newPassword: z.string()
});

export type PasswordResetPayload = z.infer<typeof passwordResetSchema>;
