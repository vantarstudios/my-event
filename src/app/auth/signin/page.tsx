'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/lib/utils';
import { authAPI } from '@/lib/api/auth';
import { useToggle, useMutationRequest, useDispatch } from '@/lib/hooks';
import { setIsAuthenticated } from '@/lib/store/is-authenticated.state';
import { Role } from '@/types/constants';
import { signInSchema } from '@/types/auth';
import type { SignInPayload } from '@/types/auth';
import { Button } from '@components/ui/buttons';
import { Input, Checkbox } from '@components/ui/form';
import { Eye, EyeOff, GoogleColored } from '@components/ui/icons';

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
        
        dispatch(setIsAuthenticated(true));
        toast.success('You are now logged in!');
        
        setTimeout(() => {
            router.replace('/dashboard');
        }, 1000);
    };

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
                <div className="flex justify-between items-center w-full px-2">
                    <Checkbox
                        name="save-login-infos"
                        label="Remember me"
                        checked={saveLoginInfos}
                        onChange={toggleSaveLoginInfos}
                    />
                    <Link href="/auth/password-reset"
                          className="flex justify-center items-center fon w-fit font-medium hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <Button
                    type="submit"
                    disabled={isMutating}
                    loading={isMutating}
                    className="hover:bg-primary"
                >
                    <p className="mx-auto">Sign in</p>
                </Button>
            </form>
            <p>or</p>
            <div className="flex justify-start items-center gap-5 mt-5 mb-10 pr-7 shadow-md rounded-full cursor-pointer transform transition-all duration-300 hover:bg-black hover:text-white">
                <div className="w-12 h-12 p-2">
                    <GoogleColored/>
                </div>
                <p>Continue with Google</p>
            </div>
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
