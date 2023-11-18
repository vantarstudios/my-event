'use client';

import { Fragment } from 'react';
import type { FormEvent } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useToggle } from '@/lib/hooks';
import { Button } from '@components/ui';
import { Input, Checkbox } from '@components/ui/form';
import { Eye, EyeOff } from '@components/ui/icons';

const SignInPage: NextPage = () => {
    const router = useRouter();
    const [isPasswordVisible, toggleIsPasswordVisible] = useToggle<boolean>(false, true);
    const [saveLoginInfos, toggleSaveLoginInfos] = useToggle<boolean>(true, false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push('/dashboard');
    };

    return (
        <Fragment>
            <h1 className="text-5xl font-bold py-10">
                Let&apos;s&nbsp;
                <span className="text-primary">sign</span>&nbsp; you&nbsp;
                <span className="text-primary">in!</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className="child:w-full flex flex-col justify-start items-center gap-10 w-full"
            >
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={() => console.log('Email')}
                />
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    autoComplete="current-password"
                    onChange={() => console.log('Email')}
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
                        labelSide="right"
                        checked={saveLoginInfos}
                        onChange={toggleSaveLoginInfos}
                    />
                </div>
                <Button type="submit">Sign in</Button>
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
            <p className="flex justify-center items-center w-full pb-20">
                Don&apos;t have an account?&nbsp;
                <Link href="/auth/signup" className="font-medium text-primary underline">
                    Sign up
                </Link>
            </p>
        </Fragment>
    );
};

export default SignInPage;
