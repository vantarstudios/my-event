'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from '@/lib/utils';
import { authAPI } from '@/lib/api/auth';
import { useToggle, useMutationRequest, useGoogleAuth } from '@/lib/hooks';
import { Role } from '@/types/constants';
import { signInSchema, type SignInPayload } from '@/types/auth';
import type { User } from '@/types';
import { PrimaryButton } from '@components/ui/buttons';
import { Input } from '@components/ui/form';
import { Eye, EyeOff, GoogleColored, Loader } from '@components/ui/icons';
import { Loader as PageLoader } from '@components/ui';

const SignInPage: NextPage = () => {
    const router = useRouter();
    const googleLogin = useGoogleLogin({
        flow: 'implicit',
        onSuccess: async (response) => {
            const profile = await loginWithGoogle({ accessToken: response.access_token });
            postLogin(profile);
        },
        onError: (error) => {
            toast.error(error.error_description || 'An error occurred while trying to login with Google.');
        }
    });
    const [isPasswordVisible, toggleIsPasswordVisible] = useToggle<boolean>(false, true);
    const [waitForDashboard, setWaitForDashboard] = useState<boolean>(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignInPayload>({
        resolver: zodResolver(signInSchema),
    });
    
    const { trigger: loginWithCredential, isMutating } = useMutationRequest(
        'sign-in',
        async (_: string, { arg: payload }: { arg: SignInPayload }) => {
            const response = await authAPI.signIn(payload);
            return response.data;
        }
    );
    
    const { trigger: loginWithGoogle, isMutating: isGoogleMutating } = useGoogleAuth('sign-in');
    
    const postLogin = (userProfile: User) => {
        if (![Role.ORGANIZER, Role.ADMIN].includes(userProfile.role)) {
            toast.error('You are not allowed to access this website!');
            router.push('/auth/signup');
            return;
        }
        
        if (!userProfile) {
            toast.error('An error occurred while trying to sign in.');
            return;
        }
        
        toast.success('You are now logged in!');
        
        router.prefetch('/dashboard');
        setWaitForDashboard(true);
        
        setTimeout(() => {
            setWaitForDashboard(false);
            router.replace('/dashboard');
        }, 3000);
    };

    const onSubmit = async (data: SignInPayload) => {
        const userProfile = await loginWithCredential(data);
        postLogin(userProfile);
    };
    
    if (waitForDashboard) {
        return <PageLoader />;
    }

    return (
        <div className="flex flex-col justify-start items-center w-[max(450px,25%)] mt-20 animate-slide-right">
            <h1 className="text-5xl font-bold">
                Let&apos;s&nbsp;
                <span className="text-5xl text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-5xl text-primary">in!</span>
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="child:w-full flex flex-col justify-start items-center gap-10 w-full my-10"
            >
                <Input
                    register={register('email')}
                    errors={errors.email?.message}
                    type="email"
                    label="Email"
                    name="email"
                    variant="auth"
                    autoComplete="email"
                    autoFocus
                />
                <div className="flex flex-col gap-y-5 w-full">
                    <Input
                        register={register('password')}
                        errors={errors.password?.message}
                        type={isPasswordVisible ? 'text' : 'password'}
                        label="Password"
                        name="password"
                        variant="auth"
                        autoComplete="current-password"
                        icon={
                            isPasswordVisible ? (
                                <Eye className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible}/>
                            ) : (
                                <EyeOff className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible}/>
                            )
                        }
                    />
                    <Link href="/auth/forgot-password"
                          className="text-sm flex justify-center items-center ml-auto w-fit font-medium hover:underline">
                        Forgot password ?
                    </Link>
                </div>
                <PrimaryButton
                    type="submit"
                    disabled={isMutating || isGoogleMutating}
                    loading={isMutating}
                >
                    <p className="mx-auto">Sign in</p>
                </PrimaryButton>
            </form>
            <p>or</p>
            <button
                name="google-login"
                onClick={() => googleLogin()}
                className="flex justify-start items-center gap-5 mt-5 mb-10 pr-7 shadow-md rounded-full cursor-pointer transform transition-all duration-300 hover:bg-black hover:text-white">
                <div className="w-12 h-12 p-2">
                    <GoogleColored/>
                </div>
                <p className="flex items-center justify-center w-44">
                    {isGoogleMutating ? <Loader className="w-6 h-6 text-primary animate-spin"/> : 'Continue with Google'}
                </p>
            </button>
            <p className="flex justify-center items-center w-full pb-10">
                Don&apos;t have an account?&nbsp;
                <Link href="/auth/signup" className="font-medium text-primary underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default SignInPage;
