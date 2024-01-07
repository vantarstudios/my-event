'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/lib/utils';
import { authAPI } from '@/lib/api/auth';
import { useToggle, useMutationRequest, useDispatch } from '@/lib/hooks';
import { setProfile } from '@/lib/store/profile';
import { Role } from '@/types/constants';
import { signInSchema } from '@/types/auth';
import type { SignInPayload } from '@/types/auth';
import { Button } from '@components/ui';
import { Input, Checkbox } from '@components/ui/form';
import { Eye, EyeOff } from '@components/ui/icons';

const SignInPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isPasswordVisible, toggleIsPasswordVisible] = useToggle<boolean>(false, true);
    const [saveLoginInfos, toggleSaveLoginInfos] = useToggle<boolean>(false, true);
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignInPayload>({
        resolver: zodResolver(signInSchema),
    });
    
    const { trigger, isMutating } = useMutationRequest(
        'sign-in',
        async (_: string, { arg: payload }: { arg: SignInPayload }) => {
            const response = await authAPI.signIn(payload);
            return response.data;
        }
    );

    const onSubmit = async (data: SignInPayload) => {
        const userProfile = await trigger(data);
        
        if (userProfile.success && ![Role.ORGANIZER, Role.ADMIN].includes(userProfile.data.role)) {
            toast.error('You are not allowed to access this website!');
            router.push('/auth/signup');
            return;
        }
        
        if (!userProfile.success) {
            toast.error(userProfile.error.message);
            return;
        }
        
        dispatch(setProfile(userProfile.data));
        toast.success('You are now logged in!');
        
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <div className="flex flex-col justify-start items-center gap-10 w-[max(450px,25%)] animate-slide">
            <h1 className="text-5xl font-bold">
                Let&apos;s&nbsp;
                <span className="text-5xl text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-5xl text-primary">in!</span>
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="child:w-full flex flex-col justify-start items-center gap-10 w-full pb-5"
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
                            <Eye className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible} />
                        ) : (
                            <EyeOff className="w-4 h-4 cursor-pointer" onClick={toggleIsPasswordVisible} />
                        )
                    }
                />
                <div className="flex justify-start items-center w-full pl-2">
                    <Checkbox
                        name="save-login-infos"
                        label="Remember me"
                        checked={saveLoginInfos}
                        onChange={toggleSaveLoginInfos}
                    />
                </div>
                <Button type="submit" disabled={isMutating} className="hover:bg-primary">
                    {
                        isMutating
                            ? 'Loading...'
                            : 'Sign in'
                    }
                </Button>
            </form>
            <Link href="/auth/password-reset" className="flex justify-center items-center w-full font-medium underline">
                Forgot password?
            </Link>
            <Image
                src="/images/google.png"
                alt="Google Auth"
                width={50}
                height={50}
                className="shadow-sm border rounded-full cursor-pointer"
            />
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
