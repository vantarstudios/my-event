'use client';

import { useState, Fragment, type FormEvent } from 'react';
import type { NextPage } from 'next';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMutationRequest, useToggle } from '@/lib/hooks';
import { authAPI } from '@/lib/api/auth';
import { toast } from '@/lib/utils';
import type { RecoveryCodeVerificationPayload, PasswordResetPayload } from '@/types/auth';
import { Input } from '@components/ui/form';
import { PrimaryButton } from '@components/ui/buttons';
import { Eye, EyeOff } from '@components/ui/icons';

enum ForgotPasswordStep {
    EMAIL = 'email',
    VERIFY = 'verify',
    RESET = 'reset',
}

type ForgotPasswordData = {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
};

const initialData: ForgotPasswordData = {
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
};

const ForgotPasswordPage: NextPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const currentStep: ForgotPasswordStep = (searchParams.get('step') as ForgotPasswordStep) ?? ForgotPasswordStep.EMAIL;
    
    const [isPasswordVisible, toggleIsPasswordVisible] = useToggle<boolean>(false, true);
    const [isConfirmPasswordVisible, toggleIsConfirmPasswordVisible] = useToggle<boolean>(false, true);
    const [data, setData] = useState<ForgotPasswordData>(initialData);
    const [errors, setErrors] = useState<Record<keyof ForgotPasswordData, string>>({
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
    });
    
    const changeStep = (step: ForgotPasswordStep) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('step', step);
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };
    
    const { trigger: sendRecoveryCode, isMutating: isSendingRecoveryCode } = useMutationRequest(
        'send-recovery-code',
        async (_: string, { arg: email }: { arg: string }) => {
            await authAPI.sendPasswordResetCode(email);
        }
    );
    
    const { trigger: verifyRecoveryCode, isMutating: isVerifyingRecoveryCode } = useMutationRequest(
        'verify-recovery-code',
        async (_: string, { arg: payload }: { arg: RecoveryCodeVerificationPayload }) => {
            await authAPI.verifyPasswordResetCode(payload);
        }
    );
    
    const { trigger: resetPassword, isMutating: isResettingPassword } = useMutationRequest(
        'reset-password',
        async (_: string, { arg: payload }: { arg: PasswordResetPayload }) => {
            await authAPI.resetPassword(payload);
        }
    );
    
    const handleDataChange = (key: keyof ForgotPasswordData) => (event: FormEvent<HTMLInputElement>) => {
        setData({ ...data, [key]: event.currentTarget.value });
    };
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        switch (currentStep) {
            case ForgotPasswordStep.EMAIL:
                if (!data.email) {
                    setErrors({ ...errors, email: 'Email is required' });
                    return;
                }
                
                setErrors({ ...errors, email: '' })
                
                await sendRecoveryCode(data.email);
                toast.success('Recovery code has been sent to your email!');
                changeStep(ForgotPasswordStep.VERIFY);
                break;
            case ForgotPasswordStep.VERIFY:
                if (!data.code) {
                    setErrors({ ...errors, code: 'Recovery code is required' });
                    return;
                }
                
                setErrors({ ...errors, code: '' });
                
                if (!data.email) {
                    setErrors({ ...errors, email: 'Email is required' });
                    return;
                }
                
                setErrors({ ...errors, email: '' })
                
                await verifyRecoveryCode({
                    email: data.email,
                    code: data.code
                });
                toast.success('The recovery code is valid!');
                changeStep(ForgotPasswordStep.RESET);
                break;
            case ForgotPasswordStep.RESET:
                if (!data.password) {
                    setErrors({ ...errors, password: 'Password is required' });
                    return;
                }
                
                setErrors({ ...errors, password: '' })
                
                if (!data.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: 'Confirm password is required' });
                    return;
                }
                
                setErrors({ ...errors, confirmPassword: '' })
                
                if (data.password !== data.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
                    return;
                }
                
                setErrors({ ...errors, confirmPassword: '' })
                
                await resetPassword({
                    email: data.email,
                    code: data.code,
                    newPassword: data.password
                });
                toast.success('Your password has been reset successfully!');
                setData(initialData);
                router.push('/auth/signin');
                break;
        }
    };
    
    return (
        <div className="flex flex-col justify-start items-center gap-y-14 w-[max(450px,25%)] mt-20 animate-slide-right">
            <h1 className="text-5xl font-bold">
                <span className="text-5xl text-primary">Reset</span>
                &nbsp;
                <span className="text-5xl">your</span>&nbsp;
                <span className="text-5xl text-primary">password</span>
            </h1>
            <form
                className="flex flex-col gap-y-5 w-full"
                onSubmit={handleSubmit}
            >
                {
                    currentStep === ForgotPasswordStep.EMAIL && (
                        <Fragment>
                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                value={data.email}
                                onChange={handleDataChange('email')}
                                errors={errors.email}
                                autoFocus
                            />
                            <PrimaryButton
                                name="send-recovery-code"
                                type="submit"
                                loading={isSendingRecoveryCode}
                                className="w-full"
                            >
                                <p className="mx-auto">Next</p>
                            </PrimaryButton>
                            <p className="text-sm text-center mt-5">
                                You will receive an email with a recovery code to reset your password.
                                <br/><br/>
                                If you don't receive an email, please check your spam folder.
                            </p>
                        </Fragment>
                    )
                }
                {
                    currentStep === ForgotPasswordStep.VERIFY && (
                        <Fragment>
                            <Input
                                name="recoveryCode"
                                type="text"
                                label="Recovery code"
                                value={data.code}
                                onChange={handleDataChange('code')}
                                errors={errors.code}
                                autoFocus
                            />
                            <PrimaryButton
                                name="verify-recovery-code"
                                type="submit"
                                loading={isVerifyingRecoveryCode}
                                className="w-full"
                            >
                                <p className="mx-auto">Next</p>
                            </PrimaryButton>
                            <p className="text-sm text-center mt-5">
                                Please enter the recovery code you received by email.
                            </p>
                        </Fragment>
                    )
                }
                {
                    currentStep === ForgotPasswordStep.RESET && (
                        <Fragment>
                            <Input
                                name="password"
                                label="New password"
                                autoFocus
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={data.password}
                                onChange={handleDataChange('password')}
                                errors={errors.password}
                                icon={
                                    isPasswordVisible ? (
                                        <Eye className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible}/>
                                    ) : (
                                        <EyeOff className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible}/>
                                    )
                                }
                            />
                            <Input
                                name="confirmPassword"
                                label="Confirm new password"
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                value={data.confirmPassword}
                                onChange={handleDataChange('confirmPassword')}
                                errors={errors.confirmPassword}
                                icon={
                                    isConfirmPasswordVisible ? (
                                        <Eye className="w-4 h-4 cursor-pointer" onClick={toggleIsConfirmPasswordVisible}/>
                                    ) : (
                                        <EyeOff className="w-4 h-4 cursor-pointer" onClick={toggleIsConfirmPasswordVisible}/>
                                    )
                                }
                            />
                            <PrimaryButton
                                name="reset-password"
                                type="submit"
                                loading={isResettingPassword}
                                className="w-full"
                            >
                                <p className="mx-auto">Reset password</p>
                            </PrimaryButton>
                            <p className="text-sm text-center mt-5">
                                Please enter your new password.
                            </p>
                        </Fragment>
                    )
                }
            </form>
            <p className="flex justify-center items-center w-full pb-10 font-medium">
                Remember your password?&nbsp;
                <Link href="/auth/signin" className="font-medium text-primary underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
