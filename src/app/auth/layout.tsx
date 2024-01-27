'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@components/ui/buttons';
import { ArrowLeft, Home } from '@components/ui/icons';

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    return (
        <main className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
            <Button
                className="absolute top-5 left-10 flex items-center gap-2 text-xl text-black bg-inherit"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-6 h-6" />
                Back
            </Button>
            <Link href="/" className="absolute top-5 right-10">
                <Button className="flex items-center gap-2 text-xl text-black bg-inherit">
                    <Home className="w-6 h-6"/>
                    Home
                </Button>
            </Link>
            {children}
        </main>
    );
};

export default AuthLayout;
